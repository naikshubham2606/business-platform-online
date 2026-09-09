import { useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  /** User-friendly error message */
  message?: string;
  /** Called when the user clicks Retry */
  onRetry?: () => void;
  /** Visual size of the error state */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Clean, user-friendly error state.
 * Shows a message, never raw error details or stack traces.
 * Provides a retry button that has its own loading state.
 */
export function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
  size = 'md',
}: ErrorStateProps) {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry || retrying) return;
    setRetrying(true);
    try {
      await Promise.resolve(onRetry());
    } finally {
      // Give it a moment so the spinner is visible
      setTimeout(() => setRetrying(false), 600);
    }
  };

  const iconSize = size === 'sm' ? 20 : size === 'lg' ? 40 : 28;
  const padding  = size === 'sm' ? 'py-6' : size === 'lg' ? 'py-20' : 'py-12';

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${padding} px-4`}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle
        aria-hidden="true"
        style={{ width: iconSize, height: iconSize, color: 'var(--color-muted)' }}
        className="mb-3"
      />
      <p
        className="mb-4 max-w-sm"
        style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}
      >
        {message}
      </p>
      {onRetry && (
        <button
          onClick={handleRetry}
          disabled={retrying}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-60 disabled:pointer-events-none"
          style={{
            background: 'var(--color-surface-alt)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
          }}
          aria-label="Retry loading"
        >
          <RefreshCw
            aria-hidden="true"
            className={retrying ? 'animate-spin' : ''}
            style={{ width: 14, height: 14 }}
          />
          {retrying ? 'Retrying…' : 'Try again'}
        </button>
      )}
    </div>
  );
}
