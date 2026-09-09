import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { TEMP_PROJECTS } from '@/data/tempProjects';
import type { ProjectItem } from '@/data/tempProjects';

/**
 * Featured projects carousel / gallery.
 *
 * @temporary — data comes from TEMP_PROJECTS in src/data/tempProjects.ts.
 * When GET /api/public/projects is available:
 *   1. Fetch the projects into a hook/context
 *   2. Pass them as `projects` prop (or replace the constant here)
 *   The rendering code does not need to change.
 *
 * Features:
 *  - Responsive card grid
 *  - Auto-advancing carousel (3s) that pauses on hover/focus
 *  - Previous / next controls
 *  - Dot indicators
 *  - Smooth cross-fade transition
 *  - Keyboard accessible
 */

const AUTOPLAY_DELAY = 3500;

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article
      className="rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: 'var(--color-surface)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.style.background = 'var(--color-surface-alt)';
            }
          }}
        />
        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: 'rgba(27,67,50,0.85)',
            color: '#fff',
            backdropFilter: 'blur(4px)',
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Text */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3
          className="font-semibold"
          style={{ color: 'var(--color-text)', fontSize: 'var(--text-base)' }}
        >
          {project.title}
        </h3>
        <p
          className="flex-1"
          style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}
        >
          {project.description}
        </p>
      </div>
    </article>
  );
}

export function FeaturedProjects() {
  // How many cards to show per "slide" depends on the viewport.
  // We manage a single active index and show a window of cards.
  const projects: ProjectItem[] = TEMP_PROJECTS;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = projects.length;

  const goTo = useCallback(
    (index: number) => setActiveIndex((index + total) % total),
    [total]
  );
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    autoplayRef.current = setInterval(next, AUTOPLAY_DELAY);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [paused, next]);

  // Keyboard left/right
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [prev, next]);

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

  // Compute the visible window (show 1 on mobile, 2 on tablet, 3 on desktop via CSS)
  // We simply render ALL cards but the carousel shifts via transform
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
      {/* Header */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
      >
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            Our Work
          </p>
          <h2
            id="projects-heading"
            className="font-bold"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--color-primary-dark)',
            }}
          >
            Featured Projects
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Prev / Next */}
          <button
            onClick={prev}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary)';
              (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
            }}
          >
            <ChevronLeft style={{ width: 18, height: 18 }} aria-hidden="true" />
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary)';
              (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
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

      {/* Carousel track */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${activeIndex * cardWidth}% - ${activeIndex * 1.5}rem))`,
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="group shrink-0"
              style={{
                width: 'calc(33.333% - 1rem)',
                minWidth: '280px',
              }}
              aria-hidden={i !== activeIndex}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div
        className="flex items-center justify-center gap-2 mt-8"
        role="tablist"
        aria-label="Project slides"
      >
        {projects.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => goTo(i)}
            className="rounded-full transition-all"
            style={{
              width:  i === activeIndex ? '24px' : '8px',
              height: '8px',
              background: i === activeIndex
                ? 'var(--color-primary)'
                : 'var(--color-border-strong)',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </section>
  );
}
