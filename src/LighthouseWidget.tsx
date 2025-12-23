import React, { useState, useEffect } from 'react';
import { Gauge, RefreshCw, AlertCircle } from 'lucide-react';
import { LighthouseScore, LighthouseWidgetProps } from './types';
import './styles.css';

const LighthouseWidget: React.FC<LighthouseWidgetProps> = ({
  apiKey,
  url,
  autoFetch = true,
  theme = {},
  onScoresFetched,
  onError,
}) => {
  const [scores, setScores] = useState<LighthouseScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [funnyMessage, setFunnyMessage] = useState('');

  const targetUrl = url || (typeof window !== 'undefined' ? window.location.origin : '');

  const funnyMessages = [
    "Hacking the mainframe...",
    "Compiling courage...",
    "Downloading more RAM...",
    "Asking the internet gods...",
    "Bribing Google's algorithms...",
    "Counting pixels manually...",
    "Summoning the DevOps spirits...",
    "Consulting the oracle of speed...",
    "Measuring internet vibes...",
    "Checking if servers are napping...",
    "Casting performance spells...",
    "Negotiating with packets...",
    "Teaching robots to count faster...",
  ];

  const getRandomMessage = () => {
    return funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  };

  const fetchLighthouseScores = async () => {
    setLoading(true);
    setError(null);
    setFunnyMessage(getRandomMessage());

    try {
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile&key=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch Lighthouse scores');
      }

      const data = await response.json();
      const categories = data.lighthouseResult.categories;

      const newScores: LighthouseScore = {
        performance: Math.round(categories.performance.score * 100),
        accessibility: Math.round(categories.accessibility.score * 100),
        bestPractices: Math.round(categories['best-practices'].score * 100),
        seo: Math.round(categories.seo.score * 100),
      };

      setScores(newScores);
      setLastChecked(new Date());
      onScoresFetched?.(newScores);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch scores';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && apiKey) {
      fetchLighthouseScores();
    }
  }, [autoFetch, apiKey]);

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'lh-text-green';
    if (score >= 50) return 'lh-text-orange';
    return 'lh-text-red';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 90) return 'lh-bg-green';
    if (score >= 50) return 'lh-bg-orange';
    return 'lh-bg-red';
  };

  const ScoreCard: React.FC<{ label: string; score: number }> = ({ label, score }) => (
    <div className="lh-flex lh-flex-col lh-items-center lh-p-4 lh-bg-gray-800 lh-rounded-lg">
      <span className="lh-text-sm lh-text-gray-400">{label}</span>
      <span className={`lh-text-4xl lh-font-bold ${getScoreColor(score)}`}>{score}</span>
      <div className="lh-w-full lh-h-2 lh-bg-gray-700 lh-rounded-full lh-mt-2">
        <div
          className={`lh-h-2 lh-rounded-full ${getScoreBgColor(score)}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="lh-bg-gray-900 lh-text-white lh-p-6 lh-rounded-lg lh-font-sans" style={theme.container}>
      <div className="lh-flex lh-justify-between lh-items-center">
        <div className="lh-flex lh-items-center">
          <Gauge className="lh-w-6 lh-h-6 lh-mr-2" />
          <h2 className="lh-text-xl lh-font-bold">LIGHTHOUSE METRICS</h2>
        </div>
        <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="lh-text-sm lh-text-gray-400 hover:lh-underline">
          {targetUrl}
        </a>
      </div>

      <div className="lh-text-center lh-my-6">
        <button
          onClick={fetchLighthouseScores}
          disabled={loading || !apiKey}
          className="lh-bg-blue-600 hover:lh-bg-blue-700 disabled:lh-bg-gray-600 lh-text-white lh-font-bold lh-py-2 lh-px-4 lh-rounded-lg lh-inline-flex lh-items-center"
        >
          <RefreshCw className={`lh-w-5 lh-h-5 lh-mr-2 ${loading ? 'lh-animate-spin' : ''}`} />
          {loading ? 'SCANNING...' : 'REFRESH'}
        </button>
        {!apiKey && <p className="lh-text-xs lh-text-red-400 lh-mt-2">API key is required to run a scan.</p>}
      </div>

      {lastChecked && !loading && (
        <div className="lh-text-center lh-text-xs lh-text-gray-500 lh-mb-4">
          Last checked: {lastChecked.toLocaleString()}
        </div>
      )}

      {error && (
        <div className="lh-bg-red-900/50 lh-border lh-border-red-400 lh-text-red-300 lh-px-4 lh-py-3 lh-rounded-lg lh-relative lh-text-center" role="alert">
          <strong className="lh-font-bold"><AlertCircle className="lh-inline lh-w-5 lh-h-5 lh-mr-2" />Error: </strong>
          <span className="lh-block sm:lh-inline">{error}</span>
          <p className="lh-text-xs lh-mt-2">
            Check your API key or visit: {' '}
            <a href="https://developers.google.com/web/tools/pagespeed/get-started" target="_blank" rel="noopener noreferrer" className="lh-underline">
              developers.google.com
            </a>
          </p>
        </div>
      )}

      {loading && !scores && (
        <div className="lh-text-center lh-mt-4">
          <p className="lh-text-lg lh-font-semibold">{funnyMessage}</p>
          <p className="lh-text-sm lh-text-gray-500">This may take 30-60 seconds</p>
          <p className="lh-text-xs lh-text-gray-400 lh-mt-2">(Actually analyzing performance, not just pretending)</p>
        </div>
      )}

      {scores && !loading && (
        <>
          <div className="lh-text-center lh-mb-4">
            <h3 className="lh-text-lg lh-font-semibold">🚀 SCAN COMPLETE 🚀</h3>
            <p className="lh-text-sm lh-text-gray-400">Your site has been judged by the algorithm overlords</p>
          </div>
          <div className="lh-grid lh-grid-cols-2 md:lh-grid-cols-4 lh-gap-4">
            <ScoreCard label="Performance" score={scores.performance} />
            <ScoreCard label="Accessibility" score={scores.accessibility} />
            <ScoreCard label="Best Practices" score={scores.bestPractices} />
            <ScoreCard label="SEO" score={scores.seo} />
          </div>
        </>
      )}

      <div className="lh-text-xs lh-text-gray-600 lh-mt-6 lh-text-center">
        <p>
          <span className="lh-text-green">🟢 90-100: Good</span> | {' '}
          <span className="lh-text-orange">🟠 50-89: Needs Improvement</span> | {' '}
          <span className="lh-text-red">🔴 0-49: Poor</span>
        </p>
      </div>
    </div>
  );
};

export default LighthouseWidget;
