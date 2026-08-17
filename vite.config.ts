// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const galleryModuleId = "virtual:gallery-images";
const resolvedGalleryModuleId = `\0${galleryModuleId}`;

function galleryImages() {
  const publicImages = resolve(process.cwd(), "public/images");

  const getImages = (folder: string) => {
    const directory = resolve(publicImages, folder);

    try {
      return readdirSync(directory, { withFileTypes: true })
        .filter((file) => file.isFile() && imageExtensions.has(file.name.slice(file.name.lastIndexOf(".")).toLowerCase()))
        .map((file) => `/images/${folder}/${encodeURIComponent(file.name)}`)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
    } catch {
      return [];
    }
  };

  const createModule = () => {
    const construction = getImages("construction");
    const concrete = getImages("concrete");
    const wood = getImages("wood");

    return [
      `export const constructionImages = ${JSON.stringify(construction)};`,
      `export const concreteImages = ${JSON.stringify(concrete)};`,
      `export const woodImages = ${JSON.stringify(wood)};`,
      "export const constructionHero = constructionImages[0] ?? \"\";",
      "export const concreteHero = concreteImages[0] ?? \"\";",
      "export const woodHero = woodImages[0] ?? \"\";",
    ].join("\n");
  };

  return {
    name: "gallery-images",
    resolveId(id: string) {
      return id === galleryModuleId ? resolvedGalleryModuleId : undefined;
    },
    load(id: string) {
      return id === resolvedGalleryModuleId ? createModule() : undefined;
    },
    configureServer(server: { watcher: { add: (path: string) => void; on: (event: string, listener: (path: string) => void) => void }; moduleGraph: { getModuleById: (id: string) => unknown; invalidateModule: (module: unknown) => void }; ws: { send: (payload: unknown) => void } }) {
      server.watcher.add(publicImages);
      server.watcher.on("all", (_event, file) => {
        if (!file.startsWith(publicImages)) return;

        const module = server.moduleGraph.getModuleById(resolvedGalleryModuleId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [galleryImages()],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
