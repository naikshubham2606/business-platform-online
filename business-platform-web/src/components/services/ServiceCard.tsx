import { ArrowRight, Leaf } from 'lucide-react';
import type { ServiceListDto } from '@/types/service';
import { resolveImageUrl } from '@/utils/imageUrl';

interface ServiceCardProps {
  service: ServiceListDto;
  index: number;
  onClick: (id: number) => void;
}

export function ServiceCard({ service, index, onClick }: ServiceCardProps) {
  const imageUrl = resolveImageUrl(service.primaryImageUrl);

  return (
    <article
      className="group rounded-xl overflow-hidden transition-all flex flex-col h-full bg-white text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
      style={{
        border: `1px solid var(--color-border)`,
        boxShadow: 'var(--card-shadow)',
        animationDelay: `${index * 0.08}s`,
      }}
      onClick={() => onClick(service.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(service.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${service.name}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--card-shadow)';
        e.currentTarget.style.transform = '';
      }}
    >
      {/* Top Image / Fallback block */}
      <div className="w-full h-48 bg-black/5 relative overflow-hidden shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={service.name || 'Service'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center transition-colors"
            style={{ background: 'var(--color-section-mid)' }}
          >
            <Leaf
              aria-hidden="true"
              className="opacity-40"
              style={{ width: 48, height: 48, color: 'var(--color-primary)' }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className="font-semibold mb-3 group-hover:text-primary transition-colors"
          style={{ color: 'var(--color-text)', fontSize: 'var(--text-lg)' }}
        >
          {service.name}
        </h3>
        <p
          className="line-clamp-3 mb-6"
          style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}
        >
          {service.shortDescription}
        </p>
        
        {/* Spacer pushes CTA to bottom */}
        <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between font-medium text-sm transition-colors" style={{ color: 'var(--color-primary)' }}>
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
