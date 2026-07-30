import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("rendert die deutschsprachige Missionszentrale", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="de"/i);
  assert.match(html, /KI – Mensch – Verantwortung/);
  assert.match(html, /KI-Ethik-Kommission/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("enthält Offline- und Datenschutzgrenzen", async () => {
  const [serviceWorker, projectLogic, supabaseAdapter] = await Promise.all([
    readFile(new URL("../public/sw.js", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/project-file.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../app/integrations/live/supabase-adapter.ts", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(serviceWorker, /caches\.open/);
  assert.match(projectLogic, /mission-project/);
  assert.doesNotMatch(projectLogic, /localStorage|indexedDB|document\.cookie/);
  assert.match(supabaseAdapter, /class SupabaseLiveAdapter/);
  assert.match(supabaseAdapter, /participant_token/);
  assert.doesNotMatch(supabaseAdapter, /service_role/);
});
