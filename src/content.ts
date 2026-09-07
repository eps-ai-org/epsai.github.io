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
  poster?: string;
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
  image: ImageAsset;
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
  hero: {
    heading: 'Great AI education grows together.',
    media: {
      kind: 'video',
      src: 'initiative-video.mp4',
      label: 'εai.org introduction video',
      width: 1920,
      height: 1080,
    } satisfies VideoAsset,
    mediaLabel: 'Title video placeholder',
  },
  about: {
    paragraph: 'We help national AI olympiad organizers build stronger competitions, share educational resources, and create better opportunities for students.',
  },
  results: {
    heading: 'What we have built',
    media: {
      kind: 'video',
      src: 'initiative-video.mp4',
      label: 'εai.org results video',
      width: 1920,
      height: 1080,
    } satisfies VideoAsset,
    mediaLabel: 'Results video placeholder',
    achievements: [
      { stat: 'X', title: 'Gold medals', description: 'For Tenerife camp participants' },
      { stat: 'X', title: 'Gold medalists', description: 'International medalists learning and training together' },
      { stat: 'X', title: 'Countries', description: 'Participating in the camp’s first year' },
      { stat: '100+', title: 'Students in Tenerife', description: 'Two weeks of AI training, practice, and exchange' },
    ] satisfies Achievement[],
  },
  programs: {
    heading: 'How we can work together',
    items: [
      { title: 'Online education', description: 'Shared learning for students preparing for AI olympiads.', image: { kind: 'image', src: 'program-online.jpg', alt: 'Students learning together with an online mentor', width: 1600, height: 900 } },
      { title: 'National olympiads', description: 'Support with selection rounds, finals, team selection, and training.', image: { kind: 'image', src: 'program-olympiad.jpg', alt: 'Olympiad organizers planning a national competition', width: 1600, height: 900 } },
      { title: 'Training camps', description: 'Focused preparation with students, mentors, and national teams.', image: { kind: 'image', src: 'program-camp.jpg', alt: 'Students and coaches working at an international training camp', width: 1600, height: 900 } },
      { title: 'Other collaboration', description: 'Bring us an idea, a challenge, or a resource. We are open.', image: { kind: 'image', src: 'program-collaboration.jpg', alt: 'Educators and students beginning a new collaboration', width: 1600, height: 900 } },
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
