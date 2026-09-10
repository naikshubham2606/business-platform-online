import { Link } from 'react-router-dom';
import { useAboutUs } from '@/hooks/useAboutUs';
import { ErrorState } from '@/components/common/ErrorState';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import { DynamicIcon } from '@/components/about/DynamicIcon';
import { resolveImageUrl } from '@/utils/imageUrl';

export function AboutPage() {
  const { data: about, loading, error, retry } = useAboutUs();

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-section-light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-section-light)' }}>
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border" style={{ borderColor: 'var(--color-border)' }}>
          <ErrorState message={error} onRetry={retry} size="md" />
        </div>
      </div>
    );
  }

  if (!about) {
    return null;
  }

  const heroImage = resolveImageUrl(about.heroImageUrl);
  const highlights = [...(about.highlights || [])].sort((a, b) => a.displayOrder - b.displayOrder);
  const values = [...(about.values || [])].sort((a, b) => a.displayOrder - b.displayOrder);
  const statistics = [...(about.statistics || [])].sort((a, b) => a.displayOrder - b.displayOrder);

  const renderParagraphs = (text: string | null) => {
    if (!text) return null;
    return text.split('\n').filter(p => p.trim() !== '').map((p, i) => (
      <p key={i} className="mb-4 last:mb-0 leading-relaxed text-opacity-90">
        {p}
      </p>
    ));
  };

  return (
    <div className="min-h-screen">
      
      {/* 1. Hero & Introduction */}
      <section className="w-full relative" style={{ background: 'var(--color-section-earth)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            {about.introductionTitle && (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
                  Who We Are
                </p>
                <h1 className="font-bold mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-primary-dark)' }}>
                  {about.introductionTitle}
                </h1>
              </>
            )}
            <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)' }}>
              {renderParagraphs(about.introduction)}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            {heroImage ? (
              <img
                src={heroImage}
                alt={about.heroImageAltText || about.introductionTitle || 'About Us'}
                className="w-full h-auto aspect-[4/3] object-cover rounded-2xl shadow-lg"
              />
            ) : (
              <div className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center border-2 border-dashed" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                <p className="text-sm font-medium opacity-50" style={{ color: 'var(--color-muted)' }}>Image not available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      {(about.storyTitle || about.story) && (
        <section className="w-full" style={{ background: 'var(--color-surface)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}>
          <div className="max-w-4xl mx-auto text-center">
            {about.storyTitle && (
              <h2 className="font-bold mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-primary-dark)' }}>
                {about.storyTitle}
              </h2>
            )}
            <div className="text-left md:text-center space-y-4" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)' }}>
              {renderParagraphs(about.story)}
            </div>
          </div>
        </section>
      )}

      {/* 3. Mission & Vision */}
      {(about.mission || about.vision) && (
        <section className="w-full" style={{ background: 'var(--color-section-mid)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {about.mission && (
              <div className="p-8 rounded-2xl shadow-sm border bg-white" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-primary-dark)' }}>
                  {about.missionTitle || 'Our Mission'}
                </h3>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)' }}>
                  {renderParagraphs(about.mission)}
                </div>
              </div>
            )}
            {about.vision && (
              <div className="p-8 rounded-2xl shadow-sm border bg-white" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-primary-dark)' }}>
                  {about.visionTitle || 'Our Vision'}
                </h3>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)' }}>
                  {renderParagraphs(about.vision)}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Our Approach */}
      {(about.approachTitle || about.approach) && (
        <section className="w-full" style={{ background: 'var(--color-surface)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}>
          <div className="max-w-4xl mx-auto">
            {about.approachTitle && (
              <h2 className="font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-primary-dark)' }}>
                {about.approachTitle}
              </h2>
            )}
            <div className="space-y-4" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)' }}>
              {renderParagraphs(about.approach)}
            </div>
          </div>
        </section>
      )}

      {/* 5. Highlights / Why Choose Us */}
      {highlights.length > 0 && (
        <section className="w-full" style={{ background: 'var(--color-section-light)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bold mb-10 text-center" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-primary-dark)' }}>
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="p-6 rounded-xl bg-white shadow-sm border" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--color-section-mid)' }}>
                    <DynamicIcon name={highlight.icon} style={{ width: 24, height: 24, color: 'var(--color-primary)' }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--text-lg)' }}>
                    {highlight.title}
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Values */}
      {values.length > 0 && (
        <section className="w-full" style={{ background: 'var(--color-section-earth)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bold mb-10 text-center" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-primary-dark)' }}>
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.id} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm" style={{ background: 'var(--color-surface)' }}>
                    <DynamicIcon name={value.icon} style={{ width: 28, height: 28, color: 'var(--color-primary)' }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-primary-dark)', fontSize: 'var(--text-lg)' }}>
                    {value.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Experience & Statistics */}
      {(about.experienceTitle || about.experienceText || statistics.length > 0) && (
        <section className="w-full" style={{ background: 'var(--color-section-mid)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {about.experienceTitle && (
                <h2 className="font-bold mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-primary-dark)' }}>
                  {about.experienceTitle}
                </h2>
              )}
              <div className="space-y-4" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)' }}>
                {renderParagraphs(about.experienceText)}
              </div>
            </div>
            
            {statistics.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {statistics.map((stat) => (
                  <div key={stat.id} className="p-6 rounded-2xl bg-white shadow-sm text-center border" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="font-bold mb-2" style={{ color: 'var(--color-primary)', fontSize: 'var(--text-4xl)' }}>
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-primary-dark)' }}>
                      {stat.label}
                    </div>
                    {stat.description && (
                      <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-xs)' }}>
                        {stat.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 8. Closing CTA */}
      {(about.closingTitle || about.closingText) && (
        <section className="w-full text-center" style={{ background: 'var(--color-surface)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}>
          <div className="max-w-3xl mx-auto">
            {about.closingTitle && (
              <h2 className="font-bold mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-primary-dark)' }}>
                {about.closingTitle}
              </h2>
            )}
            {about.closingText && (
              <p className="mb-8 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                {about.closingText}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary inline-flex items-center justify-center"
                style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--btn-primary-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--btn-primary-bg)')}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
