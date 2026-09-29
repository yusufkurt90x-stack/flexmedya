// Tarayıcıda da kullanılabilen yardımcılar (node: modülü içermez).
export const imageUrl = (name: string) => `/api/uploads/${name}`;

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
