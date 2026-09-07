import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, rm, cp, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { validateOutput } from './validate.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
const temp = join(root, '.build');

function run(script, args) {
  const result = spawnSync(process.execPath, [resolve(root, script), ...args], { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${script} failed with status ${result.status}`);
}

try {
  await rm(output, { recursive: true, force: true });
  await rm(temp, { recursive: true, force: true });
  await mkdir(temp, { recursive: true });
  run('node_modules/typescript/bin/tsc', []);
  run('node_modules/@tailwindcss/cli/dist/index.mjs', ['-i', 'src/styles.css', '-o', '.build/styles.css', '--minify']);

  const { readConfig, paths } = await import(pathToFileURL(join(temp, 'config.js')).href);
  const { renderPages } = await import(pathToFileURL(join(temp, 'render.js')).href);
  const { content } = await import(pathToFileURL(join(temp, 'content.js')).href);
  const config = readConfig(process.env);
  const url = paths(config);
  const css = await readFile(join(temp, 'styles.css'));
  const hash = createHash('sha256').update(css).digest('hex').slice(0, 12);
  const stylesheet = `assets/styles.${hash}.css`;

  await cp(join(root, 'public'), output, { recursive: true });
  await mkdir(join(output, 'assets'), { recursive: true });
  await writeFile(join(output, stylesheet), css);
  for (const page of renderPages(config, stylesheet)) {
    await writeFile(join(output, page.file), page.html);
  }

  const xmlEscape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  await writeFile(join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${xmlEscape(url.absolute())}</loc></url></urlset>\n`);
  await writeFile(join(output, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url.absolute('sitemap.xml')}\n`);
  const llms = [
    `# ${content.name}`, '', `> ${content.description}`, '',
    content.about.paragraph, '', '## Website', '',
    `- [Homepage](${url.absolute()}): Introduction, organizer results, programs, and collaboration contact.`, '',
    '## Programs', '', ...content.programs.items.map((program) => `- ${program.title}: ${program.description}`), '',
    '## Organizers', '', ...content.organizers.items.map((org) => `- [${org.name}](${org.url})`), '',
    '## Contact', '', content.contact.email ? `Email: ${content.contact.email}` : content.contact.placeholder,
    '', 'Achievements belong to the organizers. Images and videos are placeholders in this first version.', '',
  ].join('\n');
  await writeFile(join(output, 'llms.txt'), llms);
  const sizes = await validateOutput(output, config);
  console.log(`\nBuilt ${url.absolute()} → dist/`);
  console.log(`Gzip: HTML ${sizes.html} bytes · CSS ${sizes.css} bytes · interaction JavaScript ${sizes.js} bytes`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
