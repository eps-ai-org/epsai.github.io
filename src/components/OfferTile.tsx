import type { Offer } from '../content.js';

export function OfferTile({ offer }: { offer: Offer }) {
  return <article className="program-card"><h3>{offer.title}</h3><p>{offer.description}</p></article>;
}
