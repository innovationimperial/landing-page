import React, { useState, useEffect } from 'react';
import { Cpu, BarChart3, Code2, TrendingUp, Globe } from 'lucide-react';

// ── Keyframe injection (avoids styled-jsx / Next.js dependency) ──────────────
const STYLES = `
  @keyframes operatorSlideFadeIn {
    0%   { opacity: 0; transform: translateX(-60px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes operatorFadeInTop {
    0%   { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .op-header-anim {
    opacity: 0;
    transform: translateY(-20px);
    animation: operatorFadeInTop 0.8s ease-in-out forwards;
  }
  .op-delay-300 { animation-delay: 0.3s; }
  .op-delay-600 { animation-delay: 0.6s; }
`;

// ── Team data ─────────────────────────────────────────────────────────────────
const OPERATORS = [
  {
    name: 'Ntsane A. Foulo',
    role: 'CEO & Co-Founder',
    bio: 'Tech visionary engineering the future of human leverage. Expert in full-stack AI orchestration, transforming raw computational power into scaled industrial intelligence.',
    // Team portrait: CEO
    image: '/team_pictures/ceo.svg',
    icon: <Cpu size={22} className="text-primary" />,
  },
  {
    name: 'McMarsh Dzwimbu',
    role: 'COO & Co-Founder',
    bio: 'Operations and AI architect. Designs intelligent systems that integrate seamlessly into enterprise workflows, bridging strategy and execution.',
    image: '/team_pictures/coo.svg',
    icon: <BarChart3 size={22} className="text-primary" />,
  },
  {
    name: 'Enock Ndoy',
    role: 'CTO',
    bio: 'Machine learning specialist. Pushing the boundaries of applied AI to solve complex algorithmic challenges and design scalable neural infrastructures.',
    image: '/team_pictures/cto.svg',
    icon: <Code2 size={22} className="text-primary" />,
  },
  {
    name: 'Tonderai Dzwimbu',
    role: 'CFO',
    bio: 'Financial strategist and Chartered Accountant. Structuring the economic models that allow mass-scale technological leverage to remain sustainable and profitable.',
    image: '/team_pictures/cfo.svg',
    icon: <TrendingUp size={22} className="text-primary" />,
  },
  {
    name: 'Mtandazo Dube',
    role: 'CSO',
    bio: 'Business development leader. Translating complex technical advantages into clear, market-dominating strategies and establishing vital global partnerships.',
    image: '/team_pictures/cso.svg',
    icon: <Globe size={22} className="text-primary" />,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const OperatorsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  // Inject global keyframes once
  useEffect(() => {
    const id = 'operators-carousel-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    return () => {
      // leave styles — other carousel instances may still need them
    };
  }, []);

  // Staggered entrance animation
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    OPERATORS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, 180 * i);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <div
        className="flex items-stretch mx-auto"
        style={{
          minWidth: 600,
          maxWidth: 960,
          height: 440,
        }}
      >
        {OPERATORS.map((op, index) => {
          const isActive = activeIndex === index;
          const isVisible = visibleItems.includes(index);

          return (
            <div
              key={index}
              onClick={() => { if (!isActive) setActiveIndex(index); }}
              className="relative flex flex-col justify-end overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url('${op.image}')`,
                backgroundSize: isActive ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                flex: isActive ? '7 1 0%' : '1 1 0%',
                minWidth: 60,
                borderRadius: 0,
                border: `2px solid ${isActive ? 'rgba(255,255,255,0.25)' : 'rgba(41,41,41,0.8)'}`,
                boxShadow: isActive
                  ? '0 20px 60px rgba(0,0,0,0.55)'
                  : '0 6px 20px rgba(0,0,0,0.30)',
                backgroundColor: '#0d0d0d',
                zIndex: isActive ? 10 : 1,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
                transition: [
                  'flex 0.7s cubic-bezier(0.4,0,0.2,1)',
                  'box-shadow 0.7s ease',
                  'border-color 0.7s ease',
                  'background-size 0.7s ease',
                  'opacity 0.6s ease',
                  'transform 0.6s ease',
                ].join(', '),
                willChange: 'flex, box-shadow',
              }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
                  transition: 'background 0.7s ease',
                }}
              />

              {/* Primary accent line (active only) */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, var(--primary, #a78bfa), transparent)',
                  }}
                />
              )}

              {/* Label row */}
              <div className="absolute bottom-5 left-0 right-0 flex items-center gap-3 px-4 z-10 pointer-events-none">
                {/* Icon badge */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: 44,
                    height: 44,
                    minWidth: 44,
                    background: 'rgba(20,20,20,0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(100,100,100,0.5)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {op.icon}
                </div>

                {/* Name + role (visible when active) */}
                <div className="overflow-hidden">
                  <div
                    className="font-bold text-white text-base leading-tight"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                      transition: 'opacity 0.6s ease, transform 0.6s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {op.name}
                  </div>
                  <div
                    className="text-sm font-medium mt-0.5"
                    style={{
                      color: 'hsl(var(--primary))',   // Primary gold tint
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                      transition: 'opacity 0.65s 0.05s ease, transform 0.65s 0.05s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {op.role}
                  </div>
                  <div
                    className="text-xs text-gray-300 mt-1 max-w-[260px] leading-relaxed"
                    style={{
                      opacity: isActive ? 0.8 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                      transition: 'opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease',
                      whiteSpace: 'normal',
                    }}
                  >
                    {op.bio}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {OPERATORS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Select ${OPERATORS[i].name}`}
            className="transition-all duration-300"
            style={{
              width: activeIndex === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: activeIndex === i
                ? 'var(--primary, #a78bfa)'
                : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OperatorsCarousel;
