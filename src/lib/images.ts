// Collect all uploaded asset pointers via Vite glob import.
type Asset = { url: string; asset_id: string };

const concreteMods = import.meta.glob<Asset>("../assets/concrete/*.asset.json", {
  eager: true,
  import: "default",
});
const woodMods = import.meta.glob<Asset>("../assets/wood/*.asset.json", {
  eager: true,
  import: "default",
});

function sortByKey(mods: Record<string, Asset>): string[] {
  return Object.entries(mods)
    .sort(([a], [b]) => {
      const na = parseInt(a.match(/(\d+)\.asset\.json$/)?.[1] ?? "0", 10);
      const nb = parseInt(b.match(/(\d+)\.asset\.json$/)?.[1] ?? "0", 10);
      return na - nb;
    })
    .map(([, v]) => v.url);
}

export const concreteImages: string[] = sortByKey(concreteMods);
export const woodImages: string[] = sortByKey(woodMods);

// Construction service reuses concrete site photos (rebar / slabs / structural).
export const constructionImages: string[] = concreteImages;

export function pickSpread(arr: string[], count: number): string[] {
  if (arr.length === 0) return [];
  const step = Math.max(1, Math.floor(arr.length / count));
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(arr[(i * step) % arr.length]);
  return out;
}
