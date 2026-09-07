import type { ReactNode } from 'react';
import { content } from '../content.js';
import { paths, type SiteConfig } from '../config.js';

interface DocumentProps {
  config: SiteConfig;
  stylesheet: string;
  title: string;
  description: string;
  children: ReactNode;
  indexable?: boolean;
}

export function Document({ config, stylesheet, title, description, children, indexable = true }: DocumentProps) {
  const url = paths(config);
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: content.name, url: url.absolute(), description: content.description, inLanguage: 'en',
  }).replace(/</g, '\\u003c');
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#f8f8f2" />
        <meta name="color-scheme" content="light" />
        {indexable ? <link rel="canonical" href={url.absolute()} /> : <meta name="robots" content="noindex, follow" />}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={content.name} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {indexable && <meta property="og:url" content={url.absolute()} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" type="image/svg+xml" href={url.href('favicon.svg')} />
        <link rel="stylesheet" href={url.href(stylesheet)} />
        <script src={url.href('program-focus.js')} defer />
        {indexable && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
      </head>
      <body>{children}</body>
    </html>
  );
}
