import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useBusiness } from '@/context/BusinessContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { resolveImageUrl } from '@/utils/imageUrl';

// ---------------------------------------------------------------------------
// Navigation link definitions
// ---------------------------------------------------------------------------
interface NavItem {
  label: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',     to: '/'             },
  { label: 'About',   to: '/about'         },
  { label: 'Services',to: '/services'      },
  { label: 'Projects',to: '/projects'      },
  { label: 'Contact', to: '/contact'       },
];

// ---------------------------------------------------------------------------
// Logo / brand fallback
// ---------------------------------------------------------------------------
function BusinessLogo({
  logoUrl,
  businessName,
}: {
  logoUrl: string | null;
  businessName: string;
}) {
  if (logoUrl) {
    return (
      <ImageWithFallback
        src={logoUrl}
        alt={`${businessName} logo`}
        className="h-10 w-10 rounded-md object-contain"
        fallbackClassName="h-10 w-10 rounded-md"
        lazy={false}
      />
    );
  }
  // Text-initial fallback
  const initials = businessName
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <div
      className="h-10 w-10 rounded-md flex items-center justify-center font-bold text-sm shrink-0"
      style={{
        background: 'var(--color-primary)',
        color: 'var(--color-primary-fg)',
      }}
      aria-hidden="true"
    >
      {initials || '🌿'}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navbar component
// ---------------------------------------------------------------------------
export function Navbar() {
  const { branding, contact, profile } = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // businessName is nullable per Swagger — fall back through empty string to ''
  const businessName = branding.data?.businessName || profile.data?.businessName || '';
  const logoUrl = resolveImageUrl(branding.data?.logoPath);
  const phone = contact.data?.phoneNumber ?? null;

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Body scroll lock when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Keyboard: close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors px-1 py-0.5 border-b-2 ${
      isActive
        ? 'border-current'
        : 'border-transparent hover:border-current'
    }`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-shadow"
      style={{
        background: scrolled
          ? 'var(--navbar-bg-scrolled)'
          : 'var(--navbar-bg)',
        borderBottom: '1px solid var(--navbar-border)',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
        height: 'var(--navbar-height)',
      }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between"
      >
        {/* ---- Brand ---- */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
          aria-label="Go to homepage"
        >
          <BusinessLogo logoUrl={logoUrl} businessName={businessName} />
          {businessName && (
            <span
              className="font-bold text-base sm:text-lg leading-tight hidden xs:block"
              style={{ color: 'var(--color-primary-dark)', maxWidth: '12rem' }}
            >
              {businessName}
            </span>
          )}
        </Link>

        {/* ---- Desktop nav ---- */}
        <nav
          className="hidden lg:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={navLinkClass}
              style={({ isActive }) => ({
                color: isActive
                  ? 'var(--navbar-link-active)'
                  : 'var(--navbar-text)',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* ---- Desktop CTA ---- */}
        <div className="hidden lg:flex items-center gap-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'var(--color-muted)' }}
              aria-label={`Call us at ${phone}`}
            >
              <Phone style={{ width: 14, height: 14 }} aria-hidden="true" />
              {phone}
            </a>
          )}
          <Link
            to="/request-quote"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg text-sm font-semibold transition-all focus-visible:outline-none"
            style={{
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'var(--btn-primary-hover)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'var(--btn-primary-bg)')
            }
          >
            Request a Quote
          </Link>
        </div>

        {/* ---- Hamburger (mobile / tablet) ---- */}
        <button
          ref={hamburgerRef}
          type="button"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
          style={{ color: 'var(--color-text)' }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? (
            <X style={{ width: 22, height: 22 }} aria-hidden="true" />
          ) : (
            <Menu style={{ width: 22, height: 22 }} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* ---- Mobile drawer ---- */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="navigation"
        aria-label="Mobile navigation"
        className="lg:hidden overflow-hidden transition-all"
        style={{
          maxHeight: menuOpen ? '420px' : '0',
          transition: 'max-height 0.3s ease',
          background: 'var(--color-surface)',
          borderTop: menuOpen ? '1px solid var(--navbar-border)' : 'none',
        }}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={({ isActive }) => ({
                background: isActive ? 'var(--color-section-mid)' : 'transparent',
                color: isActive
                  ? 'var(--color-primary)'
                  : 'var(--color-text)',
              })}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <div className="pt-3 pb-1 border-t space-y-2" style={{ borderColor: 'var(--color-border)' }}>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 px-3 py-2 text-sm"
                style={{ color: 'var(--color-muted)' }}
              >
                <Phone style={{ width: 14, height: 14 }} aria-hidden="true" />
                {phone}
              </a>
            )}
            <Link
              to="/request-quote"
              className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
              }}
              onClick={() => setMenuOpen(false)}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
