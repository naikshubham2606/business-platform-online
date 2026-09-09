import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trees, Leaf, Flower2, Pencil, Droplets, Wind } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { TEMP_SERVICES } from '@/data/tempServices';

// ---------------------------------------------------------------------------
// Icon map — maps the string icon name in tempServices to a Lucide component
// ---------------------------------------------------------------------------
const ICON_MAP: Record<string, LucideIcon> = {
  Trees,
  Leaf,
  Flower2,
  Pencil,
  Droplets,
  Wind,
};

/**
 * Services preview section.
 *
 * @temporary — data comes from TEMP_SERVICES in src/data/tempServices.ts.
 * When GET /api/public/services is available, replace the `TEMP_SERVICES`
 * import with a hook/context call. The card rendering code stays the same.
 */
export function ServicesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Section reveal on scroll
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

  return (
    <section
      id="services"
      className="w-full"
      style={{
        background: 'var(--color-section-mid)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
      }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={sectionRef} className="reveal text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            What We Do
          </p>
          <h2
            id="services-heading"
            className="font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--color-primary-dark)',
            }}
          >
            Our Services
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: 'var(--color-muted)', fontSize: 'var(--text-base)' }}
          >
            From initial design to ongoing maintenance, we deliver expert
            outdoor solutions tailored to each property.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMP_SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon] ?? Leaf;
            return (
              <article
                key={service.id}
                className="group rounded-xl p-6 transition-all cursor-default"
                style={{
                  background: 'var(--color-surface)',
                  border: `1px solid var(--color-border)`,
                  boxShadow: 'var(--card-shadow)',
                  animationDelay: `${index * 0.08}s`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--card-shadow-hover)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--card-shadow)';
                  (e.currentTarget as HTMLElement).style.transform = '';
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{
                    background: service.highlight
                      ? 'var(--color-primary)'
                      : 'var(--color-section-mid)',
                  }}
                >
                  <Icon
                    aria-hidden="true"
                    style={{
                      width: 22,
                      height: 22,
                      color: service.highlight
                        ? '#fff'
                        : 'var(--color-primary)',
                    }}
                  />
                </div>

                <h3
                  className="font-semibold mb-2"
                  style={{
                    color: 'var(--color-text)',
                    fontSize: 'var(--text-lg)',
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    color: 'var(--color-muted)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.6,
                  }}
                >
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-medium transition-colors"
            style={{ color: 'var(--color-primary)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary-dark)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-primary)')}
          >
            View all services
            <ArrowRight style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
