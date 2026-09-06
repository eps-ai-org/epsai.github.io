import { content } from '../content.js';
import { paths, type SiteConfig } from '../config.js';
import { Brand } from '../components/Brand.js';
import { Media } from '../components/Media.js';
import { OfferTile } from '../components/OfferTile.js';

function Header() {
  return <header className="site-header shell-wide">
    <a className="brand-link" href="#top" aria-label={content.accessibleName}><Brand /></a>
    <nav aria-label="Main navigation">{content.navigation.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav>
  </header>;
}

function Hero({ config }: { config: SiteConfig }) {
  return <section className="hero shell-wide" aria-labelledby="hero-title">
    <Media config={config} asset={content.hero.media} label={content.hero.mediaLabel} heading={content.hero.heading} variant="hero" />
    <h1 id="hero-title">{content.hero.heading}</h1>
  </section>;
}

function About() {
  return <section id="about" className="about-section content-section shell-narrow" aria-label="Introduction">
    <p className="about-lead">{content.about.paragraph}</p>
  </section>;
}

function Results({ config }: { config: SiteConfig }) {
  const { results } = content;
  return <section id="results" className="results-section content-section shell-wide" aria-labelledby="results-title">
    <h2 id="results-title" className="results-heading">{results.heading}</h2>
    <div className="result-grid">
      {results.achievements.map((item, index) => <article key={item.title} className={`result-card result-card-${index + 1}`}>
        <p className="result-stat" aria-label={`${item.stat} — ${item.title}`}>{item.stat}</p>
        <div><h3>{item.title}</h3>{item.description ? <p>{item.description}</p> : null}</div>
      </article>)}
    </div>
    <Media config={config} asset={results.media} label={results.mediaLabel} variant="results" />
  </section>;
}

function Programs() {
  return <section id="programs" className="programs-section content-section shell-mid" aria-labelledby="programs-title">
    <h2 id="programs-title">{content.programs.heading}</h2>
    <div className="program-grid">{content.programs.items.map((item) => <OfferTile key={item.title} offer={item} />)}</div>
  </section>;
}

function Contact() {
  return <section id="contact" className="contact-section" aria-labelledby="contact-title">
    <div className="contact-panel shell-wide">
      <h2 id="contact-title">{content.contact.heading}</h2>
      <p>{content.contact.description}</p>
      {content.contact.email ? <a className="contact-email" href={`mailto:${content.contact.email}`}>{content.contact.email}</a> : <p className="contact-placeholder">{content.contact.placeholder}</p>}
    </div>
  </section>;
}

function Organizers({ config }: { config: SiteConfig }) {
  const url = paths(config);
  return <section id="organizers" className="organizers-section content-section shell-mid" aria-labelledby="organizers-title">
    <h2 id="organizers-title">{content.organizers.heading}</h2>
    <div className="organizer-grid">{content.organizers.items.map((organizer) => {
      const logo = organizer.logo;
      return <a key={organizer.name} className="organizer-card" href={organizer.url}>
        {logo ? <img src={url.href(logo.src)} width={logo.width} height={logo.height} alt={logo.alt} loading="lazy" decoding="async" /> : <><span>{organizer.name}</span><small>Logo placeholder</small></>}
      </a>;
    })}</div>
  </section>;
}

export function Home({ config }: { config: SiteConfig }) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top"><Header /></div>
    <main id="main"><Hero config={config} /><About /><Results config={config} /><Programs /><Contact /><Organizers config={config} /></main>
  </>;
}
