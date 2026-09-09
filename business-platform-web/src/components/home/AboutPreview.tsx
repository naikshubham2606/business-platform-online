import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { useBusiness } from '@/context/BusinessContext';
import { ErrorState } from '@/components/common/ErrorState';
import { Skeleton } from '@/components/common/LoadingSkeleton';

/**
 * About preview section.
 * Displays business name, description, and about text from the API.
 * Shows an error state if the profile failed to load.
 */
export function AboutPreview() {
  const { profile, contact, retry } = useBusiness();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const serviceArea = [contact.data?.city, contact.data?.state, contact.data?.country]
    .filter(Boolean)
    .join(', ');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="reveal w-full"
      style={{
        background: 'var(--color-section-earth)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
      }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ---- Visual column ---- */}
          <div className="order-2 lg:order-1 relative">
            {/* Main image */}
            <div
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&auto=format&fit=crop&q=75"
                alt="Landscaping team at work"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating accent card */}
            <div
              className="absolute -bottom-5 -right-5 hidden sm:block rounded-xl px-5 py-4 shadow-lg"
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
                minWidth: '9rem',
              }}
            >
              <div className="text-2xl font-bold">12+</div>
              <div className="text-xs opacity-80">Years of Experience</div>
            </div>
          </div>

          {/* ---- Text column ---- */}
          <div className="order-1 lg:order-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              Who We Are
            </p>

            {/* Loading state */}
            {profile.loading && (
              <div className="space-y-3">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            )}

            {/* Error state */}
            {!profile.loading && profile.error && (
              <ErrorState
                message="Business information is currently unavailable."
                onRetry={retry}
                size="sm"
              />
            )}

            {/* Content */}
            {!profile.loading && !profile.error && profile.data && (
              <>
                {profile.data.businessName && (
                  <h2
                    id="about-heading"
                    className="font-bold mb-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                      color: 'var(--color-primary-dark)',
                    }}
                  >
                    {profile.data.businessName}
                  </h2>
                )}

                {profile.data.aboutDescription && (
                  <p
                    className="mb-6 leading-relaxed"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--text-base)',
                    }}
                  >
                    {profile.data.aboutDescription}
                  </p>
                )}

                {/* Key points */}
                <ul className="space-y-3 mb-8">
                  {[
                    'Fully licensed and insured professionals',
                    'Tailored solutions for residential and commercial clients',
                    'Committed to sustainable and eco-friendly practices',
                    'Transparent pricing and quality workmanship guaranteed',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle
                        className="mt-0.5 shrink-0"
                        aria-hidden="true"
                        style={{
                          width: 18,
                          height: 18,
                          color: 'var(--color-primary)',
                        }}
                      />
                      <span
                        style={{
                          color: 'var(--color-text-secondary)',
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Service area badge */}
                {serviceArea && (
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
                    style={{
                      background: 'var(--color-section-mid)',
                      color: 'var(--color-primary-dark)',
                      border: '1px solid rgba(45,106,79,0.2)',
                    }}
                  >
                    <MapPin
                      style={{ width: 14, height: 14 }}
                      aria-hidden="true"
                    />
                    Serving {serviceArea}
                  </div>
                )}

                <div>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all"
                    style={{
                      background: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-fg)',
                    }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.background = 'var(--btn-primary-hover)')
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.background = 'var(--btn-primary-bg)')
                    }
                  >
                    Learn More About Us
                    <ArrowRight
                      style={{ width: 16, height: 16 }}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
