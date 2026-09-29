export const imageUrl = (url: string) => url;

export const hostname = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
};