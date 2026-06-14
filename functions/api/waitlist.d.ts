/**
 * Type definitions for Cloudflare Pages Functions
 * These types are used by Cloudflare Pages, not Next.js
 */

interface PagesFunction<Env = Record<string, unknown>> {
  (
    context: EventContext<Env, Record<string, string>, unknown>
  ): Response | Promise<Response>;
}

interface EventContext<Env, P, Data> {
  request: Request;
  env: Env;
  params: P;
  data: Data;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  functionPath: string;
}
