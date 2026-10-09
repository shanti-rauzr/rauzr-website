import { u } from '../lib/url';
export const email = 'contact@rauzr.ai';

export const demoMailto = `mailto:${email}?subject=${encodeURIComponent('Rauzr demo request')}`;

export const siteUrl = 'https://rauzr.ai';

export const brandTitle = 'Rauzr — AI agents for health and life sciences';

export type NavItem = {
  href: string;
  label: string;
  match?: string;
  children?: { href: string; label: string; note: string; depth: number; status?: string }[];
};

export const nav: NavItem[] = [
  { href: u('/'), label: 'Home' },
  {
    href: u('/products/'),
    label: 'Products',
    match: u('/products/'),
    children: [
      { href: u('/products/'), label: 'All products', note: 'What Rauzr builds, now and next', depth: 0 },
      { href: u('/products/helix/'), label: 'Rauzr Helix', note: 'Agent platform for health and life sciences', depth: 0 },
      { href: u('/products/helix/dossiq/'), label: 'Dossiq', note: 'First Helix agent · regulatory affairs', depth: 1, status: 'Available' },
      { href: u('/products/helix/#roadmap'), label: 'Full RIM and more agents', note: 'Planned · coming later', depth: 1, status: 'Planned' },
    ],
  },
  { href: u('/approach/'), label: 'How it works' },
  { href: u('/company/'), label: 'Company' },
];

export const sampleCaption =
  'Sample variation in the Dossiq interface. Not a customer result or a performance claim.';

export const disclaimer =
  'Rauzr builds decision-support software. Rauzr products, including Dossiq, do not submit dossiers to FDA, EMA, or any other agency, and they are not FDA-approved products. People review and decide.';
