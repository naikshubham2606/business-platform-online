import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useBusiness } from '@/context/BusinessContext';
import { Skeleton } from '@/components/common/LoadingSkeleton';

/**
 * Hero section — full-viewport, atmospheric landscape overlay.
 *
 * Business name, tagline, and short description come from the API:
 *   - businessName  → branding.businessName ?? profile.businessName
 *   - tagline       → branding.tagline
 *   - description   → profile.shortDescription
 *
 * All values are nullable (matching the Swagger schema).
 * Null fields are hidden; the layout gracefully collapses.
 * A generic fallback heading renders if both name and tagline are absent.
 *
 * Background: Unsplash landscape image — replace with a mediaUrl field
 * from the branding API when one is added to the backend.
 */
export function Hero() {
  const { branding, profile } = useBusiness();

  // Prefer branding.businessName; fall back to profile.businessName
  const businessName =
    branding.data?.businessName || profile.data?.businessName || null;
  const tagline     = branding.data?.tagline    || null;
  const description = profile.data?.shortDescription || null;

  // True while any of the two relevant endpoints are still loading
  const loading = branding.loading || profile.loading;

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: 'var(--hero-min-height)' }}
      aria-label="Hero"
    >
      {/* ---- Background image ---- */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&auto=format&fit=crop&q=80')",
        }}
        aria-hidden="true"
      />

      {/* ---- Gradient overlay ---- */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            135deg,
            var(--hero-overlay-start) 0%,
            var(--hero-overlay-end)  60%,
            rgba(27,67,50,0.55) 100%
          )`,
        }}
        aria-hidden="true"
      />

      {/* ---- Content ---- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center lg:items-start lg:text-left">

        {/* Eyebrow chip */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 animate-fade-in"
          style={{
            background: 'rgba(212,160,23,0.2)',
            border: '1px solid rgba(212,160,23,0.5)',
            color: 'var(--color-accent-light)',
          }}
        >
          🌿 Professional Landscaping
        </div>

        {/* Loading skeleton for name + tagline */}
        {loading && (
          <div className="space-y-4 mb-8 w-full max-w-lg">
            <Skeleton className="h-14 w-3/4" />
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
        )}

        {/* Business name — only once loading is done */}
        {!loading && businessName && (
          <h1
            className="font-bold leading-none mb-4 animate-fade-in-up"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: '#fff',
              maxWidth: '18ch',
            }}
          >
            {businessName}
          </h1>
        )}

        {/* Generic fallback when API data is absent */}
        {!loading && !businessName && !tagline && (
          <h1
            className="font-bold leading-none mb-4 animate-fade-in-up"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: '#fff',
            }}
          >
            Beautiful Outdoor Spaces
          </h1>
        )}

        {/* Tagline */}
        {!loading && tagline && (
          <p
            className="font-medium mb-4 animate-fade-in-up-delay-1"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: 'var(--color-accent-light)',
              maxWidth: '40ch',
            }}
          >
            {tagline}
          </p>
        )}

        {/* Short description */}
        {!loading && description && (
          <p
            className="mb-8 animate-fade-in-up-delay-2"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '52ch',
              lineHeight: 1.7,
            }}
          >
            {description}
          </p>
        )}

        {/* Fallback description when API has no shortDescription */}
        {!loading && !description && (
          <p
            className="mb-8 animate-fade-in-up-delay-2"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '52ch',
              lineHeight: 1.7,
            }}
          >
            Expert landscaping, garden design and maintenance services that
            transform outdoor spaces into something extraordinary.
          </p>
        )}

        {/* CTAs — always visible */}
        <div className="flex flex-col xs:flex-row items-center lg:items-start gap-4 animate-fade-in-up-delay-3">
          <Link
            to="/request-quote"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all shadow-lg"
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
            Request a Quote
            <ArrowRight style={{ width: 18, height: 18 }} aria-hidden="true" />
          </Link>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all"
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
            View Our Work
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="mt-14 flex flex-wrap gap-8 animate-fade-in-up-delay-4"
          aria-label="Key statistics"
        >
          {[
            { value: '500+', label: 'Projects Completed' },
            { value: '12+',  label: 'Years Experience'   },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div
                className="font-bold text-2xl sm:text-3xl"
                style={{ color: 'var(--color-accent-light)' }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-fade-in"
        style={{ color: 'rgba(255,255,255,0.6)' }}
        aria-label="Scroll down to services"
      >
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <ChevronDown
          style={{ width: 20, height: 20, animation: 'bounce 2s infinite' }}
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
