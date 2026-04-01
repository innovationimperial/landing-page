import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import OperatorsCarousel from '../components/ui/operators-carousel';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container         = useRef<HTMLDivElement>(null);
  const teamWrapperRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animations
    gsap.from('.hero-text', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.2,
      delay: 0.2,
    });

    // Philosophy Scroll Animation
    gsap.from('.philosophy-line', {
      scrollTrigger: {
        trigger: '.philosophy-section',
        start: 'top 70%',
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.15,
    });

    const mm = gsap.matchMedia();

    // Mobile Stagger
    mm.add("(max-width: 767px)", () => {
      gsap.from('.team-card', {
        scrollTrigger: {
          trigger: teamWrapperRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      });
    });
  }, { scope: container });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground" ref={container}>
      <Navigation />
      
      {/* Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 min-h-[70vh] flex flex-col justify-center">
          <p className="hero-text text-primary tracking-widest uppercase text-sm mb-6 font-medium font-body">The Imperial Mandate</p>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] md:leading-[0.95] tracking-tight mb-8">
            <span className="text-foreground">Ideate. Execute.</span> <br />
            <span className="bg-gradient-text bg-clip-text text-transparent italic">Iterate.</span>
          </h1>
          <div className="hero-text max-w-2xl">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-body">
              We believe in a profoundly human-centric approach to digital architecture. Technology isn't here to replace us—it is the ultimate leverage for your strategy and vision.
            </p>
          </div>
          
          <div className="hero-text mt-16 animate-bounce text-muted-foreground/50">
            <ChevronDown size={32} strokeWidth={1} />
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section container mx-auto px-6 py-32 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="philosophy-line text-primary uppercase tracking-wider text-sm mb-4 font-body">Our Core Thesis</p>
              <h2 className="philosophy-line text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-8">
                <span className="text-foreground">Technology as</span> <br/>
                <span className="bg-gradient-text bg-clip-text text-transparent">Infinite Leverage.</span>
              </h2>
            </div>
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed font-body">
              <p className="philosophy-line">
                Technology is not meant to replace the human mind; it is the ultimate lever designed to scale it. We build fundamentally human-centric systems where autonomous intelligence amplifies your intent.
              </p>
              <p className="philosophy-line">
                AI is the engine of execution. By applying our core methodology—<span className="text-foreground font-medium">Ideate, Execute, Iterate</span>—we transform computational power into a seamless extension of your team, allowing you to operate at unprecedented scale with flawless precision.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamWrapperRef} className="team-section py-32">
          <div className="container mx-auto px-6 mb-20 flex justify-between items-end">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
              <span className="text-foreground">The </span>
              <span className="bg-gradient-text bg-clip-text text-transparent italic">Operators</span>
            </h2>
            <p className="text-muted-foreground hidden md:block max-w-xs text-right text-sm font-body">Engineers, strategists, and architects of scale.</p>
          </div>

          <div className="container mx-auto px-6 mb-16">
            <OperatorsCarousel />
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default About;
