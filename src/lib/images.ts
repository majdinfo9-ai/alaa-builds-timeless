// Construction (.JPG)
export const constructionHero = "/images/construction/hero.JPG";
export const constructionImages = Array.from(
  { length: 127 },
  (_, i) => `/images/construction/${i + 1}.JPG`
);

// Concrete (.jpg)
export const concreteHero = "/images/concrete/hero.jpg";
export const concreteImages = Array.from(
  { length: 24 },
  (_, i) => `/images/concrete/${i + 1}.jpg`
);

// Wood (.jpg)
export const woodHero = "/images/wood/hero.jpg";
export const woodImages = Array.from(
  { length: 125 },
  (_, i) => `/images/wood/${i + 1}.jpg`
);

export function pickSpread(arr: string[], count: number) {
  if (arr.length <= count) return arr;

  const step = (arr.length - 1) / (count - 1);

  return Array.from({ length: count }, (_, i) => {
    return arr[Math.round(i * step)];
  });
}