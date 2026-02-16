import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroBackground from "@/assets/hero-background.jpg";
import { Sparkles } from "lucide-react";
import LiquidHeroBackground from "./LiquidHeroBackground";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import ClientLogoCarousel from "./ClientLogoCarousel";
import portfolioData from "../../research/portfolio_data.json";

const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Parallax transforms
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const cardY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Cinematic Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <img
          src={heroBackground}
          alt="Cinematic background with dramatic lighting"
          className="w-full h-full object-cover scale-110"
        />
        <LiquidHeroBackground imageUrl={heroBackground} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="grid lg:grid-cols-[60%_40%] gap-8 md:gap-12 items-center">
          {/* Left Column - Headline & CTAs */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: textY }}
          >
            <Badge variant="secondary" className="rounded-full px-4 py-2 bg-gradient-glass backdrop-blur-md border border-glass-border/[0.06] text-muted-foreground">
              <Sparkles className="w-3 h-3 mr-2 inline" />
              AWARD-WINNING DESIGN
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] md:leading-[0.95] tracking-tight">
              <span className="bg-gradient-text bg-clip-text text-transparent">
                Crafting Digital
              </span>
              <br />
              <span className="text-foreground">Experiences</span>
              <br />
              <span className="text-foreground">That Matter</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed w-full break-words">
              We design interfaces that combine beauty with functionality, creating seamless experiences that users love and businesses thrive on.
            </p>

            <div className="flex flex-wrap gap-4">
              <InteractiveHoverButton
                text="View Portfolio"
                onClick={() => navigate("/portfolio")}
                className="min-h-[44px]"
              />
            </div>
          </motion.div>

          {/* Right Column - Glass KPI Card */}
          <motion.div
            className="w-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ y: cardY }}
          >
            <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-glass backdrop-blur-2xl border border-glass-border/[0.06] shadow-glass">
              {/* Ambient glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent-warm/20 via-transparent to-highlight-magenta/10 opacity-50 blur-xl" />

              <div className="relative space-y-6">
                {/* Main KPI */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-glass border border-glass-border/[0.1] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent-warm" />
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-bold bg-gradient-text bg-clip-text text-transparent">
                      150+
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
                  </div>
                </div>

                {/* Satisfaction Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                    <span className="text-sm font-semibold text-foreground">98%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-warm to-highlight-magenta rounded-full shadow-glow transition-all duration-1000"
                      style={{ width: "98%" }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 pt-4">
                  <div className="text-center p-3 rounded-2xl bg-muted/20">
                    <div className="text-2xl font-display font-bold text-foreground">5+</div>
                    <div className="text-xs text-muted-foreground mt-1">YEARS</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-muted/20">
                    <div className="text-2xl font-display font-bold text-foreground">24/7</div>
                    <div className="text-xs text-muted-foreground mt-1">SUPPORT</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-muted/20">
                    <div className="text-2xl font-display font-bold text-foreground">100%</div>
                    <div className="text-xs text-muted-foreground mt-1">QUALITY</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs bg-accent-warm/10 text-accent-warm border-accent-warm/20">
                    ● ACTIVE
                  </Badge>
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs bg-highlight-magenta/10 text-highlight-magenta border-highlight-magenta/20">
                    ★ PREMIUM
                  </Badge>

                </div>
              </div>
            </div>

            {/* Featured Clients Card */}
            <div className="mt-6 p-4 md:p-6 rounded-3xl bg-gradient-glass backdrop-blur-2xl border border-glass-border/[0.06] shadow-glass">
              <div className="text-sm text-muted-foreground mb-4">Featured Clients</div>
              <ClientLogoCarousel logos={[
                ...portfolioData.map(p => ({
                  src: p.logo || "/placeholder.svg",
                  alt: p.title,
                  url: p.url
                })).filter(p => p.src && p.src !== "/placeholder.svg"),
                {
                  src: "/client-logos/contas-logo.svg",
                  alt: "Contas - Accounting & Advisory",
                  url: "https://contas.co.za/"
                }
              ]}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fog overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;
