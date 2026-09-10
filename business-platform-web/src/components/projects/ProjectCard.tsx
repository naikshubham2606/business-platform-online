import type { ProjectListDto } from '@/types/project';
import { resolveImageUrl } from '@/utils/imageUrl';
import { ProjectServiceTags } from './ProjectServiceTags';
import { Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectListDto;
  onClick: (id: string) => void;
  featured?: boolean;
}

export function ProjectCard({ project, onClick, featured = false }: ProjectCardProps) {
  const imageUrl = resolveImageUrl(project.primaryImageUrl);

  return (
    <article
      className="group flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        boxShadow: 'var(--card-shadow)',
      }}
      onClick={() => onClick(project.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--card-shadow)';
        e.currentTarget.style.transform = '';
      }}
    >
      <div className="relative overflow-hidden shrink-0" style={{ aspectRatio: featured ? '16/9' : '4/3' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.primaryImageAltText || project.title || 'Project image'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback image */}
        <div
          className="w-full h-full items-center justify-center bg-black/5"
          style={{ display: imageUrl ? 'none' : 'flex' }}
        >
          <ImageIcon className="w-12 h-12 opacity-20" aria-hidden="true" />
        </div>

        {featured && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-primary-fg)',
              backdropFilter: 'blur(4px)',
            }}
          >
            Featured
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3
          className="font-bold mb-2 group-hover:text-primary transition-colors"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            color: 'var(--color-primary-dark)'
          }}
        >
          {project.title}
        </h3>
        
        <p
          className="mb-6 flex-1"
          style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.6 }}
        >
          {project.shortDescription}
        </p>

        <ProjectServiceTags services={project.services} className="mt-auto pt-4 border-t border-black/5" />
      </div>
    </article>
  );
}
