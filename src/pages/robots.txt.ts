import type { APIRoute } from "astro";

const PROD_BODY = `User-agent: *
Allow: /

Sitemap: https://growkidsfuture.ro/sitemap-index.xml
`;

const STAGING_BODY = `User-agent: *
Disallow: /
`;

export const GET: APIRoute = () => {
  const body = import.meta.env.PUBLIC_IS_PROD ? PROD_BODY : STAGING_BODY;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
