import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, Camera, MessageCircle } from 'lucide-react';
import { useBusiness } from '@/context/BusinessContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { resolveImageUrl } from '@/utils/imageUrl';

const NAV_LINKS = [
  { label: 'Home',          to: '/'              },
  { label: 'About',         to: '/about'         },
  { label: 'Services',      to: '/services'      },
  { label: 'Projects',      to: '/projects'      },
  { label: 'Contact',       to: '/contact'       },
  { label: 'Request a Quote', to: '/request-quote' },
];

export function Footer() {
  const { branding, profile, contact } = useBusiness();

  // businessName is nullable — fall through both branding and profile
  const businessName = branding.data?.businessName || profile.data?.businessName || '';
  const logoUrl      = resolveImageUrl(branding.data?.logoPath);
  const description  = profile.data?.shortDescription || '';
  const info         = contact.data;
  const year         = new Date().getFullYear();

  const address = [
    info?.addressLine,
    info?.city,
    info?.state,
    info?.postalCode,
    info?.country,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <footer
      className="w-full"
      style={{ background: 'var(--color-primary-dark)', color: 'var(--color-text-on-dark)' }}
      aria-label="Site footer"
    >
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ---- Brand column ---- */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4" aria-label="Go to homepage">
              {logoUrl ? (
                <ImageWithFallback
                  src={logoUrl}
                  alt={`${businessName} logo`}
                  className="h-10 w-10 rounded-md object-contain"
                  fallbackClassName="h-10 w-10"
                  lazy={false}
                />
              ) : (
                <div
                  className="h-10 w-10 rounded-md flex items-center justify-center font-bold text-sm"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  🌿
                </div>
              )}
              {businessName && (
                <span className="font-bold text-lg" style={{ color: 'var(--color-text-on-dark)' }}>
                  {businessName}
                </span>
              )}
            </Link>
            {description && (
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {description}
              </p>
            )}
            {/* Social icons */}
            <div className="flex gap-3">
              {info?.facebookUrl && (
                <a
                  href={info.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                  aria-label="Facebook"
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                  <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
                </a>
              )}
              {info?.instagramUrl && (
                <a
                  href={info.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                  aria-label="Instagram"
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                  <Camera style={{ width: 16, height: 16 }} aria-hidden="true" />
                </a>
              )}
              {info?.whatsAppNumber && (
                <a
                  href={`https://wa.me/${info.whatsAppNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                  aria-label="WhatsApp"
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                  <MessageCircle style={{ width: 16, height: 16 }} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* ---- Quick links ---- */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Contact ---- */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              {address && (
                <li className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 shrink-0"
                    style={{ width: 16, height: 16, color: 'var(--color-accent)' }}
                    aria-hidden="true"
                  />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {address}
                  </span>
                </li>
              )}
              {info?.phoneNumber && (
                <li className="flex items-center gap-3">
                  <Phone
                    className="shrink-0"
                    style={{ width: 16, height: 16, color: 'var(--color-accent)' }}
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${info.phoneNumber}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    {info.phoneNumber}
                  </a>
                </li>
              )}
              {info?.alternatePhone && (
                <li className="flex items-center gap-3">
                  <Phone
                    className="shrink-0"
                    style={{ width: 16, height: 16, color: 'var(--color-accent)' }}
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${info.alternatePhone}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    {info.alternatePhone}
                  </a>
                </li>
              )}
              {info?.email && (
                <li className="flex items-center gap-3">
                  <Mail
                    className="shrink-0"
                    style={{ width: 16, height: 16, color: 'var(--color-accent)' }}
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${info.email}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    {info.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* ---- Copyright bar ---- */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            &copy; {year} {businessName || 'Landscaping Business'}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Professional Landscaping &amp; Garden Services
          </p>
        </div>
      </div>
    </footer>
  );
}
