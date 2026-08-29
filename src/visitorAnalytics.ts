import { doc, increment, serverTimestamp, setDoc } from 'firebase/firestore';
import { statsDb } from './visitorStatsFirebase';
import { visitorSiteConfig } from './visitorSiteConfig';

const VISITOR_ID_KEY = 'vuza-anonymous-visitor-id';
const timeZone = process.env.REACT_APP_STATS_TIME_ZONE || 'Australia/Sydney';

const isLocalDevelopmentHost = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();
  return hostname === 'localhost'
    || hostname.endsWith('.localhost')
    || hostname === '0.0.0.0'
    || hostname === '::1'
    || hostname === '[::1]'
    || hostname.startsWith('127.');
};

declare global {
  interface Window {
    __vuzaVisitorTrackingStarted?: boolean;
  }
}

const dateInStatsTimeZone = (date = new Date()): string => {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || '';
  return `${value('year')}-${value('month')}-${value('day')}`;
};

const randomVisitorId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const visitorId = (): string => {
  const existing = localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;
  const created = randomVisitorId();
  localStorage.setItem(VISITOR_ID_KEY, created);
  return created;
};

/** Records one visitor per browser/site/day and one page view per navigation. */
export const recordVisitorPageView = async (): Promise<void> => {
  const { siteId, siteName } = visitorSiteConfig;
  if (!siteId || !siteName || typeof window === 'undefined' || isLocalDevelopmentHost()) return;

  const date = dateInStatsTimeZone();
  const id = visitorId();
  const visitStorageKey = `vuza-visit:${siteId}:${date}`;
  if (!localStorage.getItem(visitStorageKey)) {
    try {
      await setDoc(doc(statsDb, 'daily_visitors', `${siteId}_${date}_${id}`), {
        siteId, date, createdAt: serverTimestamp(),
      });
      localStorage.setItem(visitStorageKey, '1');
    } catch (error) {
      console.warn('Anonymous visitor could not be recorded.', error);
    }
  }

  try {
    await setDoc(doc(statsDb, 'daily_stats', `${siteId}_${date}`), {
      siteId, siteName, date, pageViews: increment(1), updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.warn('Page view could not be recorded.', error);
  }
};

export const startVisitorAnalytics = (): void => {
  if (
    typeof window === 'undefined'
    || window.__vuzaVisitorTrackingStarted
    || isLocalDevelopmentHost()
  ) return;
  window.__vuzaVisitorTrackingStarted = true;

  let previousLocation = '';
  const trackNavigation = () => {
    const location = `${window.location.pathname}${window.location.search}`;
    const excluded = visitorSiteConfig.excludedPathPrefixes.some((path) =>
      window.location.pathname.startsWith(path),
    );
    if (excluded || location === previousLocation) return;
    previousLocation = location;
    void recordVisitorPageView();
  };

  const originalPushState = window.history.pushState.bind(window.history);
  const originalReplaceState = window.history.replaceState.bind(window.history);
  window.history.pushState = (...args) => {
    originalPushState(...args);
    trackNavigation();
  };
  window.history.replaceState = (...args) => {
    originalReplaceState(...args);
    trackNavigation();
  };
  window.addEventListener('popstate', trackNavigation);
  trackNavigation();
};
