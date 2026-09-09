import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { useBusiness } from '@/context/BusinessContext';

/**
 * Strong CTA band near the bottom of the home page.
 * Contact info (phone, email) comes from the API.
 */
export function CallToAction() {
  const { contact } = useBusiness();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.15 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const phone = contact.data?.phoneNumber;
  const email = contact.data?.email;

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="reveal w-full relative overflow-hidden"
      style={{
        padding: 'var(--section-padding-y) var(--section-padding-x)',
      }}
      aria-labelledby="cta-heading"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&auto=format&fit=crop&q=70')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(27,67,50,0.92) 0%, rgba(27,67,50,0.80) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-accent)' }}
        >
          Get Started Today
        </p>
        <h2
          id="cta-heading"
          className="font-bold mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            color: '#fff',
          }}
        >
          Ready to Transform Your Outdoor Space?
        </h2>
        <p
          className="mb-8 mx-auto"
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            maxWidth: '50ch',
            lineHeight: 1.7,
          }}
        >
          Let's bring your vision to life. Request a free quote or get in touch
          with our team today.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            to="/request-quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all shadow-lg"
            style={{
              background: 'var(--btn-accent-bg)',
              color: 'var(--btn-accent-fg)',
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.background = 'var(--btn-accent-hover)')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.background = 'var(--btn-accent-bg)')
            }
          >
            Request a Free Quote
            <ArrowRight style={{ width: 18, height: 18 }} aria-hidden="true" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.35)',
              backdropFilter: 'blur(4px)',
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')
            }
          >
            Contact Us
          </Link>
        </div>

        {/* Contact links from API */}
        {(phone || email) && (
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            {phone && (
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 text-sm transition-colors"
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                aria-label={`Call us at ${phone}`}
              >
                <Phone style={{ width: 15, height: 15 }} aria-hidden="true" />
                {phone}
              </a>
            )}
            {phone && email && (
              <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 text-sm transition-colors"
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                aria-label={`Email us at ${email}`}
              >
                <Mail style={{ width: 15, height: 15 }} aria-hidden="true" />
                {email}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
