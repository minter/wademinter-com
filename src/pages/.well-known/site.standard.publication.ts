import type { APIRoute } from 'astro';
import { generatePublicationWellKnown } from '@bryanguffey/astro-standard-site';

export const GET: APIRoute = () => {
  return new Response(
    generatePublicationWellKnown({
      did: 'did:plc:c7vyv3rfip6mejhnzairvkd3',
      publicationRkey: '3misdgqj2wkty',
    }),
    { headers: { 'Content-Type': 'text/plain' } }
  );
};
