export interface SiteConfig {
  origin: string;
  basePath: string;
}

export function readConfig(env: Record<string, string | undefined>): SiteConfig {
  const url = new URL(env.SITE_ORIGIN || 'http://localhost:4173');
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password ||
      url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_ORIGIN must be an HTTP(S) origin without a path, credentials, query, or fragment.');
  }
  const path = (env.BASE_PATH || '').replace(/^\/+|\/+$/g, '');
  if (path && path.split('/').some((segment) => !/^[a-zA-Z0-9_-][a-zA-Z0-9._-]*$/.test(segment))) {
    throw new Error('BASE_PATH must contain only ordinary URL path segments, for example /epsilon-ai.');
  }
  return { origin: url.origin, basePath: path ? `/${path}` : '' };
}

export function paths(config: SiteConfig) {
  const href = (path = ''): string => {
    if (/^(?:[a-z]+:|\/\/)/i.test(path) || path.split(/[/?#]/).some((part) => part === '..')) {
      throw new Error(`Expected a local site path: ${path}`);
    }
    return `${config.basePath}/${path.replace(/^\//, '')}`;
  };
  return { href, absolute: (path = '') => `${config.origin}${href(path)}` };
}
