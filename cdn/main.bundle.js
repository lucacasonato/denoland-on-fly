import { serve } from "./runtime.bundle.js";

/**
 * Handles a request
 * @param {Request} request 
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  // deno-lint-ignore no-undef
  const resp = await fetch(`http://deno-registry2-prod-storagebucket-b3a31d16.s3-website-us-east-1.amazonaws.com${url.pathname}`, {
    cf: { cacheEverything: true },
  });
  const resp2 = new Response(resp.body, resp);
  resp2.headers.set("Access-Control-Allow-Origin", "*");
  resp2.headers.set(
    "Content-Security-Policy",
    "default-src 'none'; style-src 'unsafe-inline'; sandbox",
  );
  return resp2;
}

addEventListener("fetch", (event) => {
  return event.respondWith(handleRequest(event.request));
});

serve(":8080");
