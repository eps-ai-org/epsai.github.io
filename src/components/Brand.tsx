import { content } from '../content.js';

export function Brand() {
  return <span className="brand" aria-label={content.accessibleName}><span className="epsilon" aria-hidden="true">ε</span><span aria-hidden="true">ai<span className="brand-domain">.org</span></span></span>;
}

export function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}
