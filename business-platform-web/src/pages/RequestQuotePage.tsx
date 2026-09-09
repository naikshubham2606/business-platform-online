import { Link } from 'react-router-dom';
import { useBusiness } from '@/context/BusinessContext';
import { Phone, Mail } from 'lucide-react';

/**
 * Request a Quote page — placeholder.
 * A full quote request form will be implemented in a future phase.
 */
export function RequestQuotePage() {
  const { contact, branding } = useBusiness();
  const businessName = branding.data?.businessName ?? '';
  const phone = contact.data?.phoneNumber;
  const email = contact.data?.email;

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--color-section-earth)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          Let's Work Together
        </p>
        <h1
          className="font-bold mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-primary-dark)',
          }}
        >
          Request a Quote
        </h1>
        <p
          className="mb-10 leading-relaxed"
          style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', maxWidth: '48ch', margin: '0 auto 2.5rem' }}
        >
          {businessName
            ? `Get in touch with ${businessName} for a free, no-obligation quote on any of our landscaping services.`
            : 'Get in touch for a free, no-obligation quote on any of our landscaping services.'}
        </p>

        <div
          className="rounded-2xl p-8 mb-8"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <p
            className="text-sm mb-6"
            style={{ color: 'var(--color-muted)' }}
          >
            Our online quote form is coming soon. In the meantime, please
            contact us directly and we'll get back to you promptly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all w-full sm:w-auto justify-center"
                style={{
                  background: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-fg)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--btn-primary-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--btn-primary-bg)')}
              >
                <Phone style={{ width: 16, height: 16 }} aria-hidden="true" />
                Call {phone}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}?subject=Quote Request`}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all w-full sm:w-auto justify-center"
                style={{
                  background: 'transparent',
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-primary)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--color-section-mid)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <Mail style={{ width: 16, height: 16 }} aria-hidden="true" />
                Email Us
              </a>
            )}
          </div>

          {!phone && !email && !contact.loading && (
            <p style={{ color: 'var(--color-muted)' }}>
              Contact information is currently unavailable. Please try again later.
            </p>
          )}
        </div>

        <Link
          to="/"
          className="text-sm transition-colors"
          style={{ color: 'var(--color-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
