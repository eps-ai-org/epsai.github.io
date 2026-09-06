import { renderToStaticMarkup } from 'react-dom/server';
import { Document } from './components/Document.js';
import { content } from './content.js';
import { Home } from './pages/Home.js';
import { NotFound } from './pages/NotFound.js';
import type { SiteConfig } from './config.js';

const pages = [
  { file: 'index.html', title: content.title, description: content.description, indexable: true, Component: Home },
  { file: '404.html', title: 'Page not found — εai.org', description: 'Let’s find our way together. Return to the εai.org homepage.', indexable: false, Component: NotFound },
] as const;

export function renderPages(config: SiteConfig, stylesheet: string) {
  return pages.map(({ file, title, description, indexable, Component }) => ({
    file,
    html: '<!doctype html>' + renderToStaticMarkup(<Document config={config} stylesheet={stylesheet} title={title} description={description} indexable={indexable}><Component config={config} /></Document>),
  }));
}
