export function trackEvent(category: string, event: string) {
  const tracker = (window as any).Matomo.getTracker();
  tracker.trackEvent(category, event);
}