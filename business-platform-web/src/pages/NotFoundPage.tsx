import { Link } from 'react-router-dom';

/** 404 Not Found page */
export function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'var(--color-section-light)' }}
    >
      <div className="max-w-lg mx-auto py-20">
        <div
          className="text-8xl font-bold mb-4"
          style={{ color: 'var(--color-primary-dark)', fontFamily: 'var(--font-display)', opacity: 0.15 }}
          aria-hidden="true"
        >
          404
        </div>
        <h1
          className="font-bold mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: 'var(--color-primary-dark)',
          }}
        >
          Page Not Found
        </h1>
        <p
          className="mb-8"
          style={{ color: 'var(--color-muted)', fontSize: 'var(--text-base)' }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--btn-primary-hover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--btn-primary-bg)')}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
