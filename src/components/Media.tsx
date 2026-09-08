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
  const assetUrl = (path: string) => /^(?:[a-z]+:|\/\/)/i.test(path) ? path : url.href(path);
  if (asset) {
    const renderedAsset = asset.kind === 'image' ? (
      <img src={url.href(asset.src)} alt={asset.alt} width={asset.width} height={asset.height} loading={variant === 'hero' ? 'eager' : 'lazy'} decoding="async" />
    ) : (
      <video autoPlay={variant === 'hero'} loop={variant === 'hero'} muted={variant === 'hero'} controls={variant === 'results'} controlsList={variant === 'results' ? 'nodownload noremoteplayback noplaybackrate' : undefined} disablePictureInPicture={variant === 'results'} disableRemotePlayback={variant === 'results'} preload="metadata" playsInline poster={asset.poster ? assetUrl(asset.poster) : undefined} width={asset.width} height={asset.height} aria-label={asset.label}>
        <source src={assetUrl(asset.src)} />
        {asset.captions && <track kind="captions" src={url.href(asset.captions)} srcLang="en" label="English" default />}
        Your browser does not support this video. <a href={assetUrl(asset.src)}>Download the video</a>.
      </video>
    );
    return <figure className={`media media-${variant} media-filled`}>
      {variant === 'hero' && asset.kind === 'video' ? <div className="hero-video-expander">{renderedAsset}</div> : renderedAsset}
      {heading && <p className="media-title" aria-hidden="true">{heading}</p>}
      {asset.kind === 'video' && asset.previewText && <p className="video-preview-text">{asset.previewText}</p>}
    </figure>;
  }
  return <figure className={`media media-${variant}`} aria-label={label}>
    <span className="media-placeholder-label">{label}</span>
    {heading && <p>{heading}</p>}
  </figure>;
}
