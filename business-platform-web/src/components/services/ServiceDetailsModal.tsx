import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, AlertCircle, Leaf } from 'lucide-react';
import { useServiceDetails } from '@/hooks/useServices';
import { resolveImageUrl } from '@/utils/imageUrl';
import { Skeleton } from '@/components/common/LoadingSkeleton';

interface ServiceDetailsModalProps {
  serviceId: number | null;
  onClose: () => void;
}

export function ServiceDetailsModal({ serviceId, onClose }: ServiceDetailsModalProps) {
  const { data: service, loading, error } = useServiceDetails(serviceId);
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset image index when opening a new service
  useEffect(() => {
    if (serviceId) {
      setActiveIndex(0);
    }
  }, [serviceId]);

  // Initial primary image determination
  useEffect(() => {
    if (service?.images && service.images.length > 0) {
      const primaryIdx = service.images.findIndex((img) => img.isPrimary);
      setActiveIndex(primaryIdx >= 0 ? primaryIdx : 0);
    }
  }, [service]);

  // Body scroll lock and Escape key handling
  useEffect(() => {
    if (!serviceId) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [serviceId, onClose]); // Note: handlePrev/Next will use stale state if we aren't careful, so we use functional state updates.

  const handlePrev = useCallback(() => {
    setActiveIndex((current) => {
      if (!service?.images || service.images.length <= 1) return current;
      return current === 0 ? service.images.length - 1 : current - 1;
    });
  }, [service]);

  const handleNext = useCallback(() => {
    setActiveIndex((current) => {
      if (!service?.images || service.images.length <= 1) return current;
      return current === service.images.length - 1 ? 0 : current + 1;
    });
  }, [service]);

  // Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  if (!serviceId) return null;

  const images = service?.images || [];
  const currentImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-full bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h2 id="modal-title" className="text-xl font-bold truncate pr-4" style={{ color: 'var(--color-primary-dark)' }}>
            {loading ? <Skeleton className="w-48 h-6" /> : service?.name || 'Service Details'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <Skeleton className="w-full aspect-[4/3] rounded-xl" />
              </div>
              <div className="flex-1 space-y-4">
                <Skeleton className="w-3/4 h-8" />
                <Skeleton className="w-full h-24" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="w-12 h-12 mb-4" style={{ color: 'var(--color-muted)' }} />
              <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg font-medium transition-colors"
                style={{ background: 'var(--color-section-mid)', color: 'var(--color-text)' }}
              >
                Close
              </button>
            </div>
          )}

          {!loading && !error && service && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Image Gallery Column */}
              <div className="flex-1 flex flex-col gap-4">
                {images.length > 0 ? (
                  <>
                    <div
                      className="relative w-full aspect-[4/3] bg-black/5 rounded-xl overflow-hidden group touch-pan-y"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <img
                        src={resolveImageUrl(currentImage.imageUrl) || ''}
                        alt={currentImage.altText || service.name || 'Service image'}
                        className="w-full h-full object-contain bg-black/10 transition-opacity duration-300"
                      />
                      
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-black shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-black shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-medium backdrop-blur-md">
                            {activeIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {hasMultipleImages && (
                      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                        {images.map((img, idx) => (
                          <button
                            key={img.id}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all focus:outline-none ${
                              activeIndex === idx ? 'border-primary' : 'border-transparent hover:border-black/20'
                            }`}
                            aria-label={`View image ${idx + 1}`}
                            aria-current={activeIndex === idx}
                            style={{ borderColor: activeIndex === idx ? 'var(--color-primary)' : undefined }}
                          >
                            <img
                              src={resolveImageUrl(img.imageUrl) || ''}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {activeIndex !== idx && (
                              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // No images fallback
                  <div className="w-full aspect-[4/3] rounded-xl flex flex-col items-center justify-center border-2 border-dashed" style={{ borderColor: 'var(--color-border)', background: 'var(--color-section-light)' }}>
                    <Leaf className="w-16 h-16 opacity-20 mb-4" />
                    <p className="text-sm font-medium opacity-50">No images available</p>
                  </div>
                )}
              </div>

              {/* Details Column */}
              <div className="flex-1 flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 w-max" style={{ background: 'var(--color-section-mid)', color: 'var(--color-primary)' }}>
                  Service Details
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary-dark)' }}>
                  {service.name}
                </h3>
                {service.shortDescription && (
                  <p className="text-lg font-medium mb-6 pb-6 border-b" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
                    {service.shortDescription}
                  </p>
                )}
                {service.description ? (
                  <div className="prose prose-sm sm:prose-base max-w-none text-opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
                    {service.description.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="italic opacity-60">No additional details provided.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
