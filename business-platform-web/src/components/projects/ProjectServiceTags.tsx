import type { ProjectServiceSummaryDto } from '@/types/project';

interface ProjectServiceTagsProps {
  services: ProjectServiceSummaryDto[] | null;
  className?: string;
}

export function ProjectServiceTags({ services, className = '' }: ProjectServiceTagsProps) {
  if (!services || services.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {services.map((service) => (
        <span
          key={service.id}
          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'var(--color-surface-alt)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          {service.name}
        </span>
      ))}
    </div>
  );
}
