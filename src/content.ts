export interface ImageAsset {
  kind: 'image';
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface VideoAsset {
  kind: 'video';
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
  captions?: string;
}

export type MediaAsset = ImageAsset | VideoAsset;

export interface Achievement {
  stat: string;
  title: string;
  description?: string;
}

export interface Offer {
  title: string;
  description: string;
}

export interface Organizer {
  name: string;
  url: string;
  logo: ImageAsset | null;
}

const organizers: Organizer[] = [
  { name: 'IOAI Spain', url: 'https://www.ioai-spain.org/', logo: { kind: 'image', src: 'logo-ioai-spain.svg', alt: 'IOAI Spain', width: 128, height: 25 } },
  { name: 'Harbour.Space', url: 'https://harbour.space/', logo: { kind: 'image', src: 'logo-harbour-space.svg', alt: 'Harbour.Space Institute of Technology', width: 469, height: 88 } },
  { name: 'Lemon AI', url: 'https://lemon-ai.org/', logo: { kind: 'image', src: 'logo-lemon-ai.png', alt: 'Lemon AI', width: 1840, height: 259 } },
];

export const content = {
  name: 'εai.org',
  accessibleName: 'εai.org (epsilon ai dot org)',
  title: 'εai.org — International collaboration for AI olympiads',
  description: 'A collaboration between AI olympiad organizers, sharing education, resources, camps, and practical experience.',
  navigation: [
    { label: 'About', id: 'about' },
    { label: 'Results', id: 'results' },
    { label: 'Programs', id: 'programs' },
    { label: 'Contact', id: 'contact' },
  ],
  hero: {
    heading: 'Great AI education grows together.',
    media: null as MediaAsset | null,
    mediaLabel: 'Title video placeholder',
  },
  about: {
    paragraph: 'We help national AI olympiad organizers build stronger competitions, share educational resources, and create better opportunities for students.',
  },
  results: {
    heading: 'What we’ve built',
    media: null as MediaAsset | null,
    mediaLabel: 'Results video placeholder',
    achievements: [
      { stat: 'X', title: 'Gold medals', description: 'For Tenerife camp participants' },
      { stat: 'X', title: 'Gold medalists', description: 'International medalists learning and training together' },
      { stat: 'X', title: 'Coaches', description: 'Experienced coaches sharing methods across national teams' },
      { stat: '100+', title: 'Students in Tenerife', description: 'Two weeks of AI training, practice, and exchange' },
    ] satisfies Achievement[],
  },
  programs: {
    heading: 'How we can work together',
    items: [
      { title: 'Online education', description: 'Shared learning for students preparing for AI olympiads.' },
      { title: 'National olympiads', description: 'Support with selection rounds, finals, team selection, and training.' },
      { title: 'Training camps', description: 'Focused preparation with students, mentors, and national teams.' },
      { title: 'Other collaboration', description: 'Bring us an idea, a challenge, or a resource. We are open.' },
    ] satisfies Offer[],
  },
  contact: {
    heading: 'Work with us',
    description: 'We are open to any collaboration that can improve AI education or national olympiads. A complete proposal is not required—an idea is enough.',
    email: null as string | null,
    placeholder: 'Contact email coming soon',
  },
  organizers: {
    heading: 'Organizers',
    items: organizers,
  },
};
