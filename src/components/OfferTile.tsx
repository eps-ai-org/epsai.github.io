import type { Offer } from '../content.js';

export function OfferTile({ offer, index }: { offer: Offer; index: number }) {
  return <article className={index === 0 ? 'program-card is-active' : 'program-card'} data-program-card={index}><h3>{offer.title}</h3><p>{offer.emphasis ? <>{offer.description} <em>{offer.emphasis}</em> {offer.descriptionEnd}</> : offer.description}</p></article>;
}
