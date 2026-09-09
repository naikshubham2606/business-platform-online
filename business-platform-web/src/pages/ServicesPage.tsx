import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { TEMP_SERVICES } from '@/data/tempServices';

/**
 * Services page — placeholder using temp service data.
 * Replace TEMP_SERVICES with real API data in a future phase.
 */
export function ServicesPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--color-section-light)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            What We Offer
          </p>
          <h1
            className="font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-primary-dark)',
            }}
          >
            Our Services
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            Full services page coming soon. Here's a preview of what we offer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TEMP_SERVICES.map((service) => (
            <div
              key={service.id}
              className="rounded-xl p-6"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ background: 'var(--color-section-mid)' }}
              >
                <Leaf
                  aria-hidden="true"
                  style={{ width: 18, height: 18, color: 'var(--color-primary)' }}
                />
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ color: 'var(--color-text)', fontSize: 'var(--text-base)' }}
              >
                {service.title}
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/request-quote"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)' }}
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
