export function trackEvent(category: string, event: string) {
  (window as any)._paq.push(["trackEvent", category, event]);
}