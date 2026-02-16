import { Badge } from "@/components/ui/badge";
import { Layers, Code, Palette, Target, Search, Grid3x3, Beaker, Rocket } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const services = [
  {
    id: 4,
    title: "Strategy & Consulting",
    description: "Strategic guidance from discovery to execution. We help you define goals, understand users, and create roadmaps for success with data-driven insights.",
    icon: Target,
    highlight: true,
  },
  {
    id: 1,
    title: "Website and Ecommerce Site development",
    description: "User-centered design that combines aesthetics with functionality. We create intuitive interfaces that enhance user satisfaction and drive engagement through research-backed design decisions.",
    icon: Layers,
    features: [
      { name: "Research", icon: Search },
      { name: "Wireframe", icon: Grid3x3 },
      { name: "Prototype", icon: Beaker },
      { name: "Testing", icon: Target },
      { name: "Launch", icon: Rocket },
    ],
  },
  {
    id: 2,
    title: "Internal Company Tools",
    description: "Pixel-perfect implementation with clean, maintainable code.",
    icon: Code,
    badges: [
      { name: "Human Resource Management System (HRMS)", icon: true },
      { name: "Customer Relationship Management System (CRM)", icon: true },
      { name: "Accounting System", icon: true },
      { name: "Learning Management System (LMS)", icon: true },
    ],
    tag: "Pro",
  },
  {
    id: 3,
    title: "Branding And Social Media Content (Ads)",
    description: "Create memorable brand identities that resonate with your audience.",
    icon: Palette,
    badges: [
      { name: "Logo Design", icon: false },
      { name: "Style Guide", icon: false },
      { name: "Marketing Assets", icon: false },
    ],
  },
];

const Services = () => {
  return (
    <section className="relative py-32" id="services">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="mb-16">
          <Badge variant="secondary" className="rounded-full px-4 py-2 bg-gradient-glass backdrop-blur-md border border-glass-border/[0.06] text-muted-foreground mb-6">
            Our Expertise
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="text-foreground">Services we</span>{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">offer</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From concept to launch, we deliver end-to-end design solutions tailored to your business goals.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <ScrollReveal
              key={service.id}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={service.highlight ? "md:col-span-2" : ""}
            >
              <div
                className={`group relative p-8 rounded-3xl bg-gradient-glass backdrop-blur-2xl border border-glass-border/[0.06] shadow-glass hover:shadow-card-hover transition-all duration-500 h-full`}
              >
                {/* Ambient glow on hover */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent-warm/10 via-transparent to-highlight-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                <div className="relative">
                  {/* Header with icon and tag */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-glass border border-glass-border/[0.1] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <service.icon className="w-8 h-8 text-accent-warm" />
                    </div>
                    {service.tag && (
                      <Badge className="rounded-full px-3 py-1 bg-highlight-magenta/10 text-highlight-magenta border-highlight-magenta/20">
                        {service.tag}
                      </Badge>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-4 group-hover:text-accent-warm transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features/Process (for Website/Ecommerce) */}
                  {service.features && (
                    <div className="flex flex-wrap gap-3">
                      {service.features.map((feature) => (
                        <div
                          key={feature.name}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20 border border-glass-border/[0.08] group-hover:bg-muted/30 group-hover:scale-105 transition-all"
                        >
                          <feature.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Badges (for Development & Branding) */}
                  {service.badges && (
                    <div className="space-y-3">
                      {service.badges.map((badge) => (
                        <div
                          key={badge.name}
                          className="flex items-center justify-between px-4 py-3 rounded-2xl bg-muted/20 border border-glass-border/[0.08] group-hover:bg-muted/30 group-hover:translate-x-1 transition-all"
                        >
                          <span className="text-sm text-foreground">{badge.name}</span>
                          {badge.icon && (
                            <div className="w-5 h-5 rounded-full bg-accent-warm/20 border border-accent-warm/30 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-accent-warm" />
                            </div>
                          )}
                        </div>
                      ))}
                      {service.tag && (
                        <Badge className="rounded-full px-3 py-1 text-xs bg-gradient-glass backdrop-blur-md border border-glass-border/[0.1]">
                          ★ Enterprise ready
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Highlight section (for Strategy) */}
                  {service.highlight && (
                    <div className="mt-8 pt-8 border-t border-glass-border/[0.1]">
                      <h4 className="text-lg font-semibold text-foreground mb-4">Transform your vision into reality</h4>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {["Discovery", "Planning", "Execution", "Optimization", "Scale"].map((phase) => (
                          <Badge
                            key={phase}
                            variant="outline"
                            className="rounded-full px-4 py-2 bg-muted/20 border-glass-border/[0.1] group-hover:border-accent-warm/30 transition-colors"
                          >
                            {phase}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Drive measurable growth and engagement.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
