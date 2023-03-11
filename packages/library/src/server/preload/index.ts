export function preload(html: string): string {
  const links = [
    ...[
      ...([
        ...html.matchAll(/<link.*type="text\/css".*href="(.+?)".*\/>/gim),
      ].map((item) => item[1]) ?? []),
      ...([
        ...html.matchAll(/<link.*href="(.+?)".*type="text\/css".*\/>/gim),
      ].map((item) => item[1]) ?? []),
    ],
  ].flat();

  return links
    .map((link) => `<link as="style" rel="preload" href="${link}" />`)
    .join("\n");
}
