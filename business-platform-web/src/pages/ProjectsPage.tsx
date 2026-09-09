import { Link } from 'react-router-dom';
import { TEMP_PROJECTS } from '@/data/tempProjects';

/**
 * Projects page — placeholder using temp project data.
 * Replace TEMP_PROJECTS with real API data (GET /api/public/projects) in a future phase.
 */
export function ProjectsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--color-section-light)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            Portfolio
          </p>
          <h1
            className="font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-primary-dark)',
            }}
          >
            Our Projects
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            A selection of our completed landscaping and garden projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TEMP_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="rounded-xl overflow-hidden"
              style={{
                background: 'var(--color-surface)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {project.category}
                </span>
                <h3
                  className="font-semibold mt-1 mb-2"
                  style={{ color: 'var(--color-text)', fontSize: 'var(--text-base)' }}
                >
                  {project.title}
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}>
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/request-quote"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)' }}
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
