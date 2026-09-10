import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useServicesList } from '@/hooks/useServices';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceDetailsModal } from '@/components/services/ServiceDetailsModal';
import { ErrorState } from '@/components/common/ErrorState';
import { Skeleton } from '@/components/common/LoadingSkeleton';

/**
 * Services page.
 * Loads and displays all active services.
 */
export function ServicesPage() {
  const { data: services, loading, error, retry } = useServicesList();
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'var(--color-section-light)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            What We Offer
          </p>
          <h1
            className="font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-primary-dark)',
            }}
          >
            Our Services
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            Explore our professional landscaping services.
          </p>
        </div>

        {/* State Handling */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
          <div className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm max-w-2xl mx-auto mb-12">
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        {!loading && !error && services && services.length === 0 && (
           <div className="text-center py-12 rounded-2xl bg-white border border-black/5 shadow-sm max-w-2xl mx-auto mb-12">
             <Leaf className="w-12 h-12 mx-auto mb-4 opacity-20" />
             <p className="text-gray-500 font-medium">No services currently available.</p>
           </div>
        )}

        {/* Service cards */}
        {!loading && !error && services && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        <div className="text-center mt-12">
          <Link
            to="/request-quote"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--btn-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--btn-primary-bg)')}
          >
            Request a Quote
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
    </div>
  );
}
