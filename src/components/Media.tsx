import type { MediaAsset } from '../content.js';
import { paths, type SiteConfig } from '../config.js';

interface MediaProps {
  config: SiteConfig;
  asset: MediaAsset | null;
  label: string;
  variant: 'hero' | 'results';
  heading?: string;
}

export function Media({ config, asset, label, variant, heading }: MediaProps) {
  const url = paths(config);
  if (asset) {
    return <figure className={`media media-${variant} media-filled`}>
      {asset.kind === 'image' ? (
        <img src={url.href(asset.src)} alt={asset.alt} width={asset.width} height={asset.height} loading={variant === 'hero' ? 'eager' : 'lazy'} decoding="async" />
      ) : (
        <video controls preload="none" playsInline poster={url.href(asset.poster)} width={asset.width} height={asset.height} aria-label={asset.label}>
          <source src={url.href(asset.src)} />
          {asset.captions && <track kind="captions" src={url.href(asset.captions)} srcLang="en" label="English" default />}
          Your browser does not support this video. <a href={url.href(asset.src)}>Download the video</a>.
        </video>
      )}
    </figure>;
  }
  return <figure className={`media media-${variant}`} aria-label={label}>
    <span className="media-placeholder-label">{label}</span>
    {heading && <p>{heading}</p>}
  </figure>;
}
