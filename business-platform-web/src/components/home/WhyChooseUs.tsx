import { useEffect, useRef } from 'react';
import { Shield, Clock, Leaf, Award, ThumbsUp, HeartHandshake } from 'lucide-react';

const BENEFITS = [
  {
    id: 'licensed',
    icon: Shield,
    title: 'Licensed & Insured',
    description:
      'Fully certified and insured professionals providing peace of mind on every project.',
  },
  {
    id: 'reliable',
    icon: Clock,
    title: 'Reliable & On Time',
    description:
      'We respect your schedule. Projects are completed on time without compromising quality.',
  },
  {
    id: 'eco',
    icon: Leaf,
    title: 'Eco-Friendly Practices',
    description:
      'Sustainable methods, native plant choices, and responsible water management in every job.',
  },
  {
    id: 'quality',
    icon: Award,
    title: 'Quality Workmanship',
    description:
      'High standards in every detail — from soil preparation to final finishing touches.',
  },
  {
    id: 'satisfaction',
    icon: ThumbsUp,
    title: 'Client Satisfaction',
    description:
      "We're not done until you're completely happy. Satisfaction is our measure of success.",
  },
  {
    id: 'service',
    icon: HeartHandshake,
    title: 'Personalised Service',
    description:
      'Every property is unique. We listen, design, and deliver solutions built around your needs.',
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="reveal w-full"
      style={{
        background: 'var(--color-section-dark)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
      }}
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-accent)' }}
          >
            Why Choose Us
          </p>
          <h2
            id="why-us-heading"
            className="font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: '#fff',
            }}
          >
            The Difference We Deliver
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-base)' }}
          >
            We combine horticultural expertise with genuine care for our clients and their properties.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="group rounded-xl p-6 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,160,23,0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(212,160,23,0.15)' }}
                >
                  <Icon
                    aria-hidden="true"
                    style={{ width: 20, height: 20, color: 'var(--color-accent)' }}
                  />
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: '#fff', fontSize: 'var(--text-base)' }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.6,
                  }}
                >
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
