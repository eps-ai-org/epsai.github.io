import { paths, type SiteConfig } from '../config.js';
import { Brand, Arrow } from '../components/Brand.js';

export function NotFound({ config }: { config: SiteConfig }) {
  return <div className="not-found container-shell"><a href={paths(config).href()} className="brand-link" aria-label="εai.org — home"><Brand /></a><main><p className="eyebrow">404 · A little off the path</p><h1>Let’s find our<br /><span>way together.</span></h1><p>This page isn’t here, but there’s plenty to discover back home.</p><a className="button button-dark" href={paths(config).href()}>Back to the good stuff<Arrow /></a></main></div>;
}
