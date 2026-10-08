export const email = 'Shanti@rauzr.ai';

export const demoMailto = `mailto:${email}?subject=${encodeURIComponent('Dossiq demo request')}`;

export const siteUrl = 'https://rauzr.ai';

export const nav = [
  { href: '/product/', label: 'Product' },
  { href: '/approach/', label: 'Approach' },
  { href: '/company/', label: 'Company' },
] as const;

export const sampleCaption =
  'Sample variation in the Dossiq interface. Not a customer result or a performance claim.';

export const disclaimer =
  'Dossiq is decision-support software for regulatory affairs teams. It does not submit dossiers to FDA, EMA, or any other agency, and it is not an FDA-approved product.';
