// Prefix a root path with the configured base (e.g. /rauzr-website/ on the
// GitHub Pages preview, / on rauzr.ai). Usage: u('/product/').
export const u = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path;
