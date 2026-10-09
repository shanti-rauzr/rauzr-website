import { u } from '../lib/url';
export const email = 'contact@rauzr.ai';

export const demoMailto = `mailto:${email}?subject=${encodeURIComponent('Dossiq demo request')}`;

export const siteUrl = 'https://rauzr.ai';

export const nav = [
  { href: u('/'), label: 'Home' },
  { href: u('/product/'), label: 'Dossiq' },
  { href: u('/approach/'), label: 'Approach' },
  { href: u('/company/'), label: 'Company' },
] as const;

export const sampleCaption =
  'Sample variation in the Dossiq interface. Not a customer result or a performance claim.';

export const disclaimer =
  'Dossiq is decision-support software for regulatory affairs teams. It does not submit dossiers to FDA, EMA, or any other agency, and it is not an FDA-approved product.';
