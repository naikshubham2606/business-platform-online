import { Link } from 'react-router-dom';
import { useBusiness } from '@/context/BusinessContext';

/**
 * About page — placeholder.
 * Replace with full about content in a future phase.
 */
export function AboutPage() {
  const { profile } = useBusiness();
  const businessName = profile.data?.businessName ?? 'Our Company';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'var(--color-section-earth)' }}
    >
      <div className="max-w-2xl mx-auto py-20">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          About Us
        </p>
        <h1
          className="font-bold mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-primary-dark)',
          }}
        >
          {businessName}
        </h1>
        {profile.data?.aboutDescription && (
          <p
            className="mb-8 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)' }}
          >
            {profile.data.aboutDescription}
          </p>
        )}
        <p
          className="mb-8"
          style={{ color: 'var(--color-muted)' }}
        >
          Full about page coming soon. In the meantime, explore our services or request a quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all"
            style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)' }}
          >
            Our Services
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all"
            style={{
              background: 'transparent',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-primary)',
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
