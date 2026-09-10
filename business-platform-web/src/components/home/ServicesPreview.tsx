import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import { useServicesList } from '@/hooks/useServices';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceDetailsModal } from '@/components/services/ServiceDetailsModal';
import { ErrorState } from '@/components/common/ErrorState';
import { Skeleton } from '@/components/common/LoadingSkeleton';

/**
 * Services preview section.
 */
export function ServicesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: services, loading, error, retry } = useServicesList();
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

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
      className="w-full relative"
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

        {/* State Handling */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/5 flex flex-col h-full">
                <Skeleton className="w-full h-48 rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm max-w-2xl mx-auto">
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        {!loading && !error && services && services.length === 0 && (
           <div className="text-center py-12 rounded-2xl bg-white border border-black/5 shadow-sm max-w-2xl mx-auto">
             <Leaf className="w-12 h-12 mx-auto mb-4 opacity-20" />
             <p className="text-gray-500 font-medium">No services currently available.</p>
           </div>
        )}

        {/* Service cards */}
        {!loading && !error && services && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
                onClick={setSelectedServiceId} 
              />
            ))}
          </div>
        )}

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

      {/* Modal Overlay */}
      {selectedServiceId !== null && (
        <ServiceDetailsModal 
          serviceId={selectedServiceId} 
          onClose={() => setSelectedServiceId(null)} 
        />
      )}
    </section>
  );
}
