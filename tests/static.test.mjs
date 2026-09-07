import test from 'node:test';
import assert from 'node:assert/strict';
import { readConfig, paths } from '../.build/config.js';
import { renderPages } from '../.build/render.js';
import { content } from '../.build/content.js';

test('URLs work at an origin root and under a repository path', () => {
  for (const base of ['', '/', '/epsilon-ai/', 'epsilon-ai']) {
    const config = readConfig({ SITE_ORIGIN: 'https://example.github.io', BASE_PATH: base });
    const expectedBase = base.includes('epsilon-ai') ? '/epsilon-ai' : '';
    assert.equal(paths(config).href(), `${expectedBase}/`);
    assert.equal(paths(config).href('/assets/site.css'), `${expectedBase}/assets/site.css`);
    assert.equal(paths(config).absolute(), `https://example.github.io${expectedBase}/`);
    const pages = renderPages(config, 'assets/site.css');
    const html = pages.find((page) => page.file === 'index.html').html;
    assert(html.includes(`href="${expectedBase}/assets/site.css"`));
    assert(html.includes(`href="${expectedBase}/favicon.svg"`));
    assert(html.includes(`href="https://example.github.io${expectedBase}/"`));
    const notFound = pages.find((page) => page.file === '404.html').html;
    assert(notFound.includes(`href="${expectedBase}/"`));
    assert(notFound.includes('noindex, follow'));
  }
});

test('invalid deployment settings fail instead of generating broken URLs', () => {
  for (const origin of ['file:///tmp', 'https://example.org/project', 'https://user:pass@example.org', 'https://example.org/?x=1']) {
    assert.throws(() => readConfig({ SITE_ORIGIN: origin }));
  }
  for (const base of ['../outside', '/%2e%2e/', '/one//two', '/repo?x=1']) {
    assert.throws(() => readConfig({ BASE_PATH: base }));
  }
  const url = paths(readConfig({}));
  assert.throws(() => url.href('../outside'));
  assert.throws(() => url.href('https://another.example/asset.png'));
});

test('static content uses only the focused-program interaction script', () => {
  const config = readConfig({});
  const html = renderPages(config, 'assets/site.css')[0].html;
  assert.equal((html.match(/<script\b/g) || []).length, 2);
  assert(html.includes('<script type="application/ld+json">'));
  assert(html.includes('src="/program-focus.js"'));
  assert(!/\son[a-z]+="/i.test(html));
  if (content.contact.email === null) assert(!html.includes('mailto:'));
  if ([content.hero.media, content.results.media].every((asset) => asset === null)) {
    assert(!html.includes('<video'));
  }
  assert(!html.includes('<iframe'));
  if (content.results.media?.kind === 'video') {
    assert(html.includes('controls=""'));
    assert(html.includes('controlsList="nodownload noremoteplayback noplaybackrate"'));
    assert(!html.includes('data-video-controls'));
  }
  for (const item of content.results.achievements) {
    assert(html.includes(item.stat));
    assert(html.includes(item.title));
    if (item.description) assert(html.includes(item.description));
  }
  for (const organizer of content.organizers.items) assert(html.includes(organizer.name));
  for (const program of content.programs.items) assert(html.includes(program.image.src));
  assert.equal((html.match(/Logo placeholder/g) || []).length, content.organizers.items.filter((organizer) => organizer.logo === null).length);
});
