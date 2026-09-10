import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjectsList } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectDetailsModal } from '@/components/projects/ProjectDetailsModal';
import { ErrorState } from '@/components/common/ErrorState';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import { Image as ImageIcon } from 'lucide-react';

export function ProjectsPage() {
  const { data: projects, loading, error, retry } = useProjectsList();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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
            Explore some of our completed landscaping work.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col h-full border" style={{ borderColor: 'var(--color-border)' }}>
                <Skeleton className="w-full aspect-[4/3] rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-7 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-6" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-white rounded-3xl p-8 border shadow-sm max-w-2xl mx-auto mb-12" style={{ borderColor: 'var(--color-border)' }}>
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        {!loading && !error && projects && projects.length === 0 && (
           <div className="text-center py-16 rounded-3xl bg-white border shadow-sm max-w-2xl mx-auto mb-12" style={{ borderColor: 'var(--color-border)' }}>
             <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
             <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary-dark)' }}>We're currently updating our project portfolio.</h3>
             <p className="text-gray-500 font-medium">Please check back soon.</p>
           </div>
        )}

        {!loading && !error && projects && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProjectId} 
              />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/request-quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--btn-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--btn-primary-bg)')}
          >
            Start Your Project
          </Link>
        </div>
      </div>

      {selectedProjectId && (
        <ProjectDetailsModal
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  );
}
