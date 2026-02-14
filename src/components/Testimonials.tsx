import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content: "Working with Innovation Imperial transformed our digital presence completely. Their attention to detail and innovative approach exceeded our expectations.",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, GrowthLab",
    content: "The team delivered an exceptional website that perfectly captures our brand. Their expertise in both design and development is truly remarkable.",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Roberts",
    role: "Marketing Director, Nexus Corp",
    content: "From concept to launch, the entire process was seamless. They understood our vision and brought it to life with stunning results.",
    avatar: "ER",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-32" id="testimonials">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-warm/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="secondary" className="rounded-full px-4 py-2 bg-gradient-glass backdrop-blur-md border border-glass-border/[0.06] text-muted-foreground mb-6">
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="text-foreground">What our</span>{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">clients say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — hear from some of our satisfied clients.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="group relative p-8 rounded-3xl bg-gradient-glass backdrop-blur-2xl border border-glass-border/[0.06] shadow-glass hover:shadow-card-hover transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Ambient glow on hover */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent-warm/10 via-transparent to-highlight-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              <div className="relative">
                {/* Quote icon */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-glass border border-glass-border/[0.1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Quote className="w-6 h-6 text-accent-warm" />
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-warm/30 to-highlight-magenta/30 border border-glass-border/[0.1] flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
