import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : join(directory, entry.name)));
  return nested.flat();
}

export async function validateOutput(directory, config) {
  const root = resolve(directory);
  const files = await walk(root);
  const scripts = files.filter((file) => /\.[cm]?js$/.test(file));
  assert.deepEqual(scripts.map((file) => file.slice(root.length + 1)), ['scripts/program-focus.js'], 'Only the program focus interaction may ship as JavaScript.');
  assert(!files.some((file) => /\.(?:map|tsx?)$/.test(file)), 'Source files do not belong in dist.');
  const homepage = await readFile(join(root, 'index.html'), 'utf8');
  for (const id of ['about', 'results', 'programs', 'contact', 'organizers']) {
    assert(homepage.includes(`id="${id}"`), `Homepage is missing #${id}.`);
  }
  assert(homepage.includes('εai.org'), 'The exact site name must appear in the exported HTML.');
  const homepageUrl = `${config.origin}${config.basePath}/`;
  assert(homepage.includes(`<link rel="canonical" href="${homepageUrl}"`), 'Canonical URL does not match deployment.');

  for (const file of files.filter((name) => extname(name) === '.html')) {
    const html = await readFile(file, 'utf8');
    assert(html.startsWith('<!doctype html>'), `Missing doctype: ${file}`);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one h1: ${file}`);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate IDs: ${file}`);
    for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (script[1].includes('type="application/ld+json"')) {
        const data = JSON.parse(script[2]);
        assert.equal(data.url, homepageUrl, 'JSON-LD URL does not match deployment.');
      } else {
        assert(script[1].includes('src=') && script[1].includes('program-focus.js') && script[1].includes('defer'), 'Unexpected executable script.');
        assert.equal(script[2].trim(), '', 'The interaction script must remain external.');
      }
    }
    for (const match of html.matchAll(/\s(?:href|src|poster)="([^"]+)"/g)) {
      const reference = match[1].replaceAll('&amp;', '&');
      if (/^(?:https?:|mailto:)/.test(reference)) continue;
      if (reference.startsWith('#')) {
        assert(ids.includes(reference.slice(1)), `Broken fragment ${reference} in ${file}`);
        continue;
      }
      assert(reference.startsWith(`${config.basePath}/`), `Asset missing base path: ${reference}`);
      const relative = decodeURIComponent(reference.slice(config.basePath.length + 1).split(/[?#]/)[0]);
      let destination = resolve(root, relative);
      assert(destination === root || destination.startsWith(`${root}${sep}`), `Asset escapes dist: ${reference}`);
      if (destination === root || reference.endsWith('/')) destination = join(destination, 'index.html');
      assert((await stat(destination)).isFile(), `Missing asset: ${reference}`);
    }
  }
  const cssFiles = files.filter((file) => file.endsWith('.css'));
  assert.equal(cssFiles.length, 1, 'Expected one compiled stylesheet.');
  const css = await readFile(cssFiles[0], 'utf8');
  assert(!/@import\s/.test(css), 'CSS must be fully compiled.');
  assert(!/https?:\/\//.test(css.replace(/\/\*[\s\S]*?\*\//g, '')), 'No external CSS resources should load.');
  const interaction = await readFile(scripts[0]);
  const sizes = { html: gzipSync(homepage).length, css: gzipSync(css).length, js: gzipSync(interaction).length };
  assert(sizes.html <= 35 * 1024, `HTML exceeds 35 KiB gzip: ${sizes.html}`);
  assert(sizes.css <= 20 * 1024, `CSS exceeds 20 KiB gzip: ${sizes.css}`);
  assert(sizes.js <= 3 * 1024, `Interaction JavaScript exceeds 3 KiB gzip: ${sizes.js}`);
  for (const name of ['sitemap.xml', 'robots.txt', 'llms.txt']) {
    assert((await readFile(join(root, name), 'utf8')).includes(homepageUrl), `${name} must use the deployment URL.`);
  }
  assert((await readFile(join(root, '404.html'), 'utf8')).includes('noindex, follow'), '404 should not be indexed.');
  return sizes;
}
