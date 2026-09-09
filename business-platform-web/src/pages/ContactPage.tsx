import { useBusiness } from '@/context/BusinessContext';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ExternalLink,
  Camera,
  MessageCircle,
} from 'lucide-react';

/**
 * Contact page.
 *
 * All contact information comes exclusively from GET /api/public/contact
 * via BusinessContext (loaded once on app mount, shared globally).
 * No API call is made here — no duplicate requests.
 *
 * API DTO fields used (BusinessContactDto):
 *   phoneNumber, alternatePhone, email, websiteUrl,
 *   addressLine, city, state, postalCode, country,
 *   facebookUrl, instagramUrl, whatsAppNumber
 *
 * All fields are nullable. Missing fields are hidden — no empty labels,
 * no "undefined", no broken links.
 *
 * States handled:
 *   contact.loading → skeleton matching the page card layout
 *   contact.error   → ErrorState with retry (retries all three endpoints)
 *   contact.data    → full contact UI
 *   !data && !error && !loading → graceful "unavailable" message
 */
export function ContactPage() {
  const { contact, branding, retry } = useBusiness();

  // businessName is nullable in Swagger — fall back gracefully
  const businessName = branding.data?.businessName || null;
  const info = contact.data;

  // Build address lines — each part only if non-empty.
  // Line 1: street address
  // Line 2: city, state, postal code
  // Line 3: country
  const addressParts = buildAddress(info);

  // -------------------------------------------------------------------------
  // Card style shared across all contact cards
  // -------------------------------------------------------------------------
  const cardStyle: React.CSSProperties = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--card-shadow)',
    color: 'var(--color-text)',
    textDecoration: 'none',
  };
  const iconWrapStyle: React.CSSProperties = {
    background: 'var(--color-section-mid)',
  };

  // -------------------------------------------------------------------------
  // Loading state — skeleton matching the card grid layout
  // -------------------------------------------------------------------------
  if (contact.loading) {
    return (
      <div
        className="min-h-screen"
        style={{ background: 'var(--color-section-light)' }}
        aria-label="Loading contact information…"
        role="status"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header skeleton */}
          <div className="text-center mb-12 space-y-3">
            <Skeleton className="h-4 w-24 mx-auto" />
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-4 w-72 mx-auto" />
          </div>

          {/* Card grid skeleton — mirrors the real grid: 2 small + 1 wide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl sm:col-span-2" />
          </div>

          {/* Social row skeleton */}
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Error state
  // -------------------------------------------------------------------------
  if (contact.error) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: 'var(--color-section-light)' }}
      >
        {/* Keep the header so the page doesn't feel completely broken */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              Get In Touch
            </p>
            <h1
              className="font-bold mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--color-primary-dark)',
              }}
            >
              Contact {businessName ?? 'Us'}
            </h1>
          </div>

          <div
            className="rounded-2xl"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <ErrorState
              message={
                contact.error === 'Contact information is currently unavailable.'
                  ? 'Unable to load contact information. Please try again.'
                  : 'Unable to load contact information. Please try again.'
              }
              onRetry={retry}
              size="md"
            />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Has data — determine which social/action links exist
  // -------------------------------------------------------------------------
  const hasSocials =
    !!info?.facebookUrl || !!info?.instagramUrl || !!info?.whatsAppNumber;
  const hasAnyContact =
    !!info?.phoneNumber ||
    !!info?.alternatePhone ||
    !!info?.email ||
    !!info?.websiteUrl ||
    addressParts.length > 0 ||
    hasSocials;

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--color-section-light)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ---- Page header ---- */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            Get In Touch
          </p>
          <h1
            className="font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-primary-dark)',
            }}
          >
            Contact {businessName ?? 'Us'}
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            We&apos;d love to hear from you. Reach out using any of the methods
            below.
          </p>
        </div>

        {/* ---- Contact cards grid ---- */}
        {hasAnyContact ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

              {/* Primary phone */}
              {info?.phoneNumber && (
                <a
                  href={`tel:${info.phoneNumber}`}
                  className="flex items-center gap-4 p-5 rounded-xl transition-all"
                  style={cardStyle}
                  onMouseEnter={e =>
                    (e.currentTarget.style.boxShadow =
                      '0 4px 20px rgba(0,0,0,0.10)')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.boxShadow =
                      'var(--card-shadow)')
                  }
                  aria-label={`Call us at ${info.phoneNumber}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={iconWrapStyle}
                  >
                    <Phone
                      style={{ width: 20, height: 20, color: 'var(--color-primary)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Phone
                    </div>
                    <div className="font-medium truncate">{info.phoneNumber}</div>
                  </div>
                </a>
              )}

              {/* Alternate phone — shown as a separate card if different from primary */}
              {info?.alternatePhone && info.alternatePhone !== info.phoneNumber && (
                <a
                  href={`tel:${info.alternatePhone}`}
                  className="flex items-center gap-4 p-5 rounded-xl transition-all"
                  style={cardStyle}
                  onMouseEnter={e =>
                    (e.currentTarget.style.boxShadow =
                      '0 4px 20px rgba(0,0,0,0.10)')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.boxShadow = 'var(--card-shadow)')
                  }
                  aria-label={`Call us at ${info.alternatePhone}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={iconWrapStyle}
                  >
                    <Phone
                      style={{ width: 20, height: 20, color: 'var(--color-primary)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Alternate Phone
                    </div>
                    <div className="font-medium truncate">{info.alternatePhone}</div>
                  </div>
                </a>
              )}

              {/* Email */}
              {info?.email && (
                <a
                  href={`mailto:${info.email}`}
                  className="flex items-center gap-4 p-5 rounded-xl transition-all"
                  style={cardStyle}
                  onMouseEnter={e =>
                    (e.currentTarget.style.boxShadow =
                      '0 4px 20px rgba(0,0,0,0.10)')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.boxShadow = 'var(--card-shadow)')
                  }
                  aria-label={`Email us at ${info.email}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={iconWrapStyle}
                  >
                    <Mail
                      style={{ width: 20, height: 20, color: 'var(--color-primary)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Email
                    </div>
                    <div className="font-medium truncate">{info.email}</div>
                  </div>
                </a>
              )}

              {/* Website — only when websiteUrl is present */}
              {info?.websiteUrl && (
                <a
                  href={info.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl transition-all"
                  style={cardStyle}
                  onMouseEnter={e =>
                    (e.currentTarget.style.boxShadow =
                      '0 4px 20px rgba(0,0,0,0.10)')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.boxShadow = 'var(--card-shadow)')
                  }
                  aria-label="Visit our website"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={iconWrapStyle}
                  >
                    <Globe
                      style={{ width: 20, height: 20, color: 'var(--color-primary)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Website
                    </div>
                    <div className="font-medium truncate">
                      {info.websiteUrl.replace(/^https?:\/\//, '')}
                    </div>
                  </div>
                </a>
              )}

              {/* Address — spans full width when present */}
              {addressParts.length > 0 && (
                <div
                  className="flex items-start gap-4 p-5 rounded-xl sm:col-span-2"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={iconWrapStyle}
                  >
                    <MapPin
                      style={{ width: 20, height: 20, color: 'var(--color-primary)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Address
                    </div>
                    {/* Each address line on its own line — no stray commas */}
                    {addressParts.map((line, i) => (
                      <div
                        key={i}
                        className="font-medium"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ---- Social / messaging links ---- */}
            {hasSocials && (
              <div className="flex flex-wrap gap-3 justify-center">
                {info?.facebookUrl && (
                  <a
                    href={info.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    aria-label="Visit our Facebook page"
                  >
                    <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
                    Facebook
                  </a>
                )}
                {info?.instagramUrl && (
                  <a
                    href={info.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    aria-label="Visit our Instagram page"
                  >
                    <Camera style={{ width: 16, height: 16 }} aria-hidden="true" />
                    Instagram
                  </a>
                )}
                {info?.whatsAppNumber && (
                  <a
                    href={`https://wa.me/${info.whatsAppNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    aria-label={`Chat on WhatsApp: ${info.whatsAppNumber}`}
                  >
                    <MessageCircle style={{ width: 16, height: 16 }} aria-hidden="true" />
                    WhatsApp
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          /* No contact fields at all — data loaded but all fields null */
          <div
            className="rounded-2xl text-center py-12 px-6"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
            }}
          >
            Contact information is currently unavailable. Please check back soon.
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Address formatting helper
// ---------------------------------------------------------------------------

/**
 * Formats BusinessContactDto address fields into a clean array of display lines.
 *
 * Output lines:
 *   Line 0: addressLine              (e.g. "123 Green Street")
 *   Line 1: city, state  postalCode  (e.g. "Panaji, Goa 403001")
 *   Line 2: country                  (e.g. "India")
 *
 * Empty / null parts are omitted. No trailing commas, no blank lines.
 */
function buildAddress(
  info: {
    addressLine: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
  } | null
): string[] {
  if (!info) return [];

  const lines: string[] = [];

  if (info.addressLine) {
    lines.push(info.addressLine);
  }

  // Build "City, State PostalCode" — each part optional
  const cityStateParts = [
    info.city,
    [info.state, info.postalCode].filter(Boolean).join(' '),
  ].filter(Boolean);

  if (cityStateParts.length > 0) {
    lines.push(cityStateParts.join(', '));
  }

  if (info.country) {
    lines.push(info.country);
  }

  return lines;
}
