import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useProjectsList } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectDetailsModal } from '@/components/projects/ProjectDetailsModal';
import { ErrorState } from '@/components/common/ErrorState';
import { Skeleton } from '@/components/common/LoadingSkeleton';

const AUTOPLAY_DELAY = 3500;

export function FeaturedProjects() {
  const { data: projectsData, loading, error, retry } = useProjectsList();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Use up to 6 projects for the carousel
  const projects = projectsData ? projectsData.slice(0, 6) : [];
  const total = projects.length;

  const goTo = useCallback(
    (index: number) => {
      if (total > 0) setActiveIndex((index + total) % total);
    },
    [total]
  );
  
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused || total === 0) return;
    autoplayRef.current = setInterval(next, AUTOPLAY_DELAY);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [paused, next, total]);

  // Keyboard left/right
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (selectedProjectId) return; // Don't navigate carousel if modal is open
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [prev, next, selectedProjectId]);

  // Section reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const cardWidth = 100 / 3; // show ~3 on desktop

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="reveal w-full overflow-hidden"
      style={{
        background: 'var(--color-section-light)',
        padding: 'var(--section-padding-y) 0',
      }}
      aria-labelledby="projects-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
            Our Work
          </p>
          <h2 id="projects-heading" className="font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--color-primary-dark)' }}>
            Featured Projects
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous project"
            disabled={total <= 1}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
            onMouseEnter={e => {
              if (total > 1) {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary)';
                (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
              }
            }}
            onMouseLeave={e => {
              if (total > 1) {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
              }
            }}
          >
            <ChevronLeft style={{ width: 18, height: 18 }} aria-hidden="true" />
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            disabled={total <= 1}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
            onMouseEnter={e => {
              if (total > 1) {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary)';
                (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
              }
            }}
            onMouseLeave={e => {
              if (total > 1) {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
              }
            }}
          >
            <ChevronRight style={{ width: 18, height: 18 }} aria-hidden="true" />
          </button>

          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium transition-colors ml-2"
            style={{ color: 'var(--color-primary)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary-dark)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-primary)')}
          >
            All projects
            <ArrowRight style={{ width: 15, height: 15 }} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {loading && (
          <div className="flex gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="shrink-0 w-[calc(33.333%-1rem)] min-w-[280px]">
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm border" style={{ borderColor: 'var(--color-border)' }}>
                  <Skeleton className="w-full aspect-[4/3] rounded-none" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-white rounded-2xl p-8 border max-w-2xl mx-auto" style={{ borderColor: 'var(--color-border)' }}>
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border max-w-2xl mx-auto" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-gray-500 font-medium">More projects coming soon.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${activeIndex * cardWidth}% - ${activeIndex * 1.5}rem))` }}
            aria-live="polite"
            aria-atomic="true"
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="group shrink-0"
                style={{ width: 'calc(33.333% - 1rem)', minWidth: '280px' }}
                aria-hidden={i !== activeIndex}
              >
                <ProjectCard 
                  project={project} 
                  featured={true} 
                  onClick={setSelectedProjectId} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && !error && projects.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Project slides">
          {projects.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to project ${i + 1}`}
              onClick={() => goTo(i)}
              className="rounded-full transition-all"
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '8px',
                background: i === activeIndex ? 'var(--color-primary)' : 'var(--color-border-strong)',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}

      {selectedProjectId && (
        <ProjectDetailsModal
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </section>
  );
}
