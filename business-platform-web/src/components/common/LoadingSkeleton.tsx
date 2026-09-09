/**
 * Reusable skeleton loading placeholders.
 * Use these instead of raw "Loading..." text for page-level loading states.
 */

interface SkeletonProps {
  className?: string;
}

/** Single skeleton block */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer rounded ${className}`}
      aria-hidden="true"
    />
  );
}

/** Full home page skeleton shown while business data loads */
export function HomePageSkeleton() {
  return (
    <div aria-label="Loading page content…" role="status">
      {/* Hero skeleton */}
      <div className="w-full" style={{ minHeight: '92vh', background: '#e5e7eb' }}>
        <div className="skeleton-shimmer w-full h-full" style={{ minHeight: '92vh' }} />
      </div>

      {/* Sections skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* Services preview */}
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-72 mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-5 w-3/4 mt-4 mx-4" />
                <Skeleton className="h-4 w-full mt-2 mx-4 mb-4" />
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

/** Navbar skeleton for initial load */
export function NavbarSkeleton() {
  return (
    <div
      className="w-full flex items-center justify-between px-6"
      style={{ height: 'var(--navbar-height)', background: 'var(--navbar-bg)', borderBottom: '1px solid var(--navbar-border)' }}
      aria-hidden="true"
    >
      <Skeleton className="h-8 w-36" />
      <div className="hidden md:flex gap-6">
        {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-4 w-16" />)}
      </div>
      <Skeleton className="h-9 w-32 rounded-lg" />
    </div>
  );
}
