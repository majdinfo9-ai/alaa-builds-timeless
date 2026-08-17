// Vite generates this module by scanning public/images at build time. Any image
// file in a service folder is included, regardless of its name or numbering.
export {
  constructionHero,
  constructionImages,
  concreteHero,
  concreteImages,
  woodHero,
  woodImages,
} from "virtual:gallery-images";

export function pickSpread(arr: string[], count: number) {
  if (arr.length <= count) return arr;

  const step = (arr.length - 1) / (count - 1);

  return Array.from({ length: count }, (_, i) => {
    return arr[Math.round(i * step)];
  });
}
