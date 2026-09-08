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
  emphasis?: string;
  descriptionEnd?: string;
  image: ImageAsset;
}

export interface Organizer {
  name: string;
  url: string;
  logo: ImageAsset | null;
}

const organizers: Organizer[] = [
  { name: 'IOAI Spain', url: 'https://www.ioai-spain.org/', logo: { kind: 'image', src: 'images/logos/logo-ioai-spain.svg', alt: 'IOAI Spain', width: 128, height: 25 } },
  { name: 'Harbour.Space', url: 'https://harbour.space/', logo: { kind: 'image', src: 'images/logos/logo-harbour-space.svg', alt: 'Harbour.Space Institute of Technology', width: 469, height: 88 } },
  { name: 'Lemon AI', url: 'https://lemon-ai.org/', logo: { kind: 'image', src: 'images/logos/logo-lemon-ai.png', alt: 'Lemon AI', width: 1840, height: 259 } },
];

export const content = {
  name: 'εai.org',
  accessibleName: 'εai.org (epsilon ai dot org)',
  title: 'εai.org — International collaboration for AI olympiads',
  description: 'A collaboration between AI olympiad organizers, sharing education, resources, camps, and practical experience.',
  hero: {
    heading: 'Great AI education, together!',
    media: {
      kind: 'video',
      src: 'videos/initiative.mp4',
      label: 'εai.org introduction video',
      width: 1920,
      height: 1080,
    } satisfies VideoAsset,
    mediaLabel: 'Title video placeholder',
  },
  about: {
    paragraph: 'We are an international collaboration of national AI olympiad organizers. We work together to build stronger competitions, make world-class education accessible, and give our students the best possible opportunities!',
  },
  results: {
    heading: 'What we have built',
    media: {
      kind: 'video',
      src: 'videos/io1.mp4',
      label: 'εai.org results video',
      width: 1920,
      height: 1080,
    } satisfies VideoAsset,
    mediaLabel: 'Results video placeholder',
    achievements: [
      { stat: 'X', title: 'Gold medals', description: 'Won at the 2026 International Olympiad in AI by participants in the Tenerife AI Camp' },
      { stat: 'X', title: 'Debut countries', description: 'We helped them create national olympiads or prepare students for the 2026 cycle—their first!' },
      { stat: 'IOAI Gold', title: 'Camp teachers', description: 'Many of our Tenerife AI Camp teachers were gold medalists at previous IOAI editions' },
      { stat: '100+', title: 'Students in Tenerife', description: 'Two weeks of AI training, practice, and exchange' },
    ] satisfies Achievement[],
  },
  programs: {
    heading: 'How we can work together',
    items: [
      { title: 'Online education', description: 'Shared online training and a supportive community for olympiad preparation', image: { kind: 'image', src: 'images/programs/online-education.jpg', alt: 'Students learning together with an online mentor', width: 1600, height: 900 } },
      { title: 'National olympiads', description: 'Full-cycle organization or support for national selection rounds', image: { kind: 'image', src: 'images/programs/national-olympiads.jpg', alt: 'Olympiad organizers planning a national competition', width: 1600, height: 384 } },
      { title: 'Training camps', description: 'In-person camps led by world-class teachers to prepare students for IOAI', image: { kind: 'image', src: 'images/programs/training-camps.jpg', alt: 'Students and coaches working at an international training camp', width: 1600, height: 900 } },
      { title: 'Other collaboration', description: 'We are open to', emphasis: 'anything', descriptionEnd: '- bring us your idea!', image: { kind: 'image', src: 'images/programs/other-collaboration.jpg', alt: 'Educators and students beginning a new collaboration', width: 1600, height: 900 } },
    ] satisfies Offer[],
  },
  contact: {
    heading: 'Work together with us',
    description: 'Let’s get in touch and talk about how we can help each other.',
    email: null as string | null,
    placeholder: 'Contact email coming soon',
  },
  organizers: {
    heading: 'Organizers',
    items: organizers,
  },
};
