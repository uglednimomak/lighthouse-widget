import { CSSProperties } from 'react';

export interface LighthouseScore {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface LighthouseWidgetProps {
  /** Google PageSpeed Insights API Key */
  apiKey: string;
  /** URL to test (defaults to window.location.origin) */
  url?: string;
  /** Auto-fetch on mount (default: true) */
  autoFetch?: boolean;
  /** Custom theme colors */
  theme?: {
    primary?: string;
    background?: string;
    border?: string;
    container?: CSSProperties;
  };
  /** Callback when scores are fetched */
  onScoresFetched?: (scores: LighthouseScore) => void;
  /** Callback when error occurs */
  onError?: (error: string) => void;
}
