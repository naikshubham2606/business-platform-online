import { useEffect, useState, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Image as ImageIcon } from 'lucide-react';
import { useProjectDetails } from '@/hooks/useProjects';
import { resolveImageUrl } from '@/utils/imageUrl';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { ProjectServiceTags } from './ProjectServiceTags';

interface ProjectDetailsModalProps {
  projectId: string;
  onClose: () => void;
}

export function ProjectDetailsModal({ projectId, onClose }: ProjectDetailsModalProps) {
  const { data: project, loading, error, retry } = useProjectDetails(projectId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();

      if (!project || !project.images || project.images.length <= 1) return;

      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev === project.images!.length - 1 ? 0 : prev + 1));
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev === 0 ? project.images!.length - 1 : prev - 1));
      }
    },
    [onClose, project]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Trap focus
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, [project]);

  const images = project?.images ? [...project.images].sort((a, b) => a.displayOrder - b.displayOrder) : [];
  const currentImage = images[activeImageIndex];
  const currentImageUrl = currentImage ? resolveImageUrl(currentImage.imageUrl) : null;

  const nextImage = () => {
    if (images.length > 1) {
      setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
      aria-labelledby="project-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-5xl max-h-full flex flex-col rounded-2xl shadow-2xl overflow-hidden outline-none bg-white"
        style={{
          background: 'var(--color-surface)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="p-8">
              <Skeleton className="w-full h-64 sm:h-80 md:h-[400px] rounded-t-2xl mb-8" />
              <Skeleton className="w-3/4 h-10 mb-4" />
              <div className="flex gap-4 mb-8">
                <Skeleton className="w-24 h-6 rounded-full" />
                <Skeleton className="w-24 h-6 rounded-full" />
              </div>
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-5/6 h-4" />
            </div>
          )}

          {error && (
            <div className="p-12 flex items-center justify-center min-h-[50vh]">
              <ErrorState message={error} onRetry={retry} />
            </div>
          )}

          {!loading && !error && project && (
            <div>
              {/* Large Image Area */}
              <div className="relative w-full h-64 sm:h-80 md:h-[400px] bg-black group select-none shrink-0">
                {currentImageUrl ? (
                  <img
                    src={currentImageUrl}
                    alt={currentImage.altText || project.title || 'Project image'}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-black/5">
                    <ImageIcon className="w-16 h-16 text-black/20 mb-4" />
                    <span className="text-black/40 font-medium text-sm">No image available</span>
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/50 text-white backdrop-blur-md">
                      {activeImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="w-full bg-black/5 border-b border-black/5 p-4 overflow-x-auto">
                  <div className="flex items-center gap-3 w-max mx-auto px-2">
                    {images.map((img, idx) => (
                      <button
                        key={img.id}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 rounded-md overflow-hidden shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                          idx === activeImageIndex ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={resolveImageUrl(img.imageUrl) || ''}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div className="p-6 md:p-10 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div className="flex-1">
                    <h2
                      id="project-modal-title"
                      className="font-bold mb-4"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                        color: 'var(--color-primary-dark)'
                      }}
                    >
                      {project.title}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium mb-6" style={{ color: 'var(--color-muted)' }}>
                      {project.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project.completionDate && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(project.completionDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                        </div>
                      )}
                    </div>

                    <ProjectServiceTags services={project.services} className="mb-4" />
                  </div>
                </div>

                <div className="prose prose-lg max-w-none" style={{ color: 'var(--color-text-secondary)' }}>
                  {(project.description || project.shortDescription || '').split('\n').filter(p => p.trim()).map((p, i) => (
                    <p key={i} className="mb-4 last:mb-0 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
