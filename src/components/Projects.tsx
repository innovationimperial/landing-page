import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import { Globe, Sparkles } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Fintech platform",
    category: "Web Design",
    image: project1,
    icon: Globe,
  },
  {
    id: 2,
    title: "Health tracker",
    category: "Mobile App",
    image: project2,
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Dashboard",
    category: "Dashboard",
    image: project3,
    icon: Globe,
  },
  {
    id: 4,
    title: "Brand Identity",
    category: "Branding",
    image: project4,
    icon: Sparkles,
  },
];

const Projects = () => {
  return (
    <section className="relative py-32 overflow-hidden" id="work">
      {/* Cosmic background with particles */}
      <div className="absolute inset-0 bg-gradient-cosmic opacity-60" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[45%_55%] gap-12 items-start mb-16">
          {/* Left - Heading & Description */}
          <div className="space-y-6 animate-fade-in">
            <Badge variant="secondary" className="rounded-full px-4 py-2 bg-gradient-glass backdrop-blur-md border border-glass-border/[0.06] text-muted-foreground">
              Featured Projects
            </Badge>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              <span className="text-foreground">Recent Design</span>
              <br />
              <span className="bg-gradient-text bg-clip-text text-transparent">Work</span>
            </h2>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="rounded-full bg-muted/20 border-glass-border/[0.1]">
                  Web Design
                </Badge>
                <Badge variant="outline" className="rounded-full bg-muted/20 border-glass-border/[0.1]">
                  Mobile Apps
                </Badge>
                <Badge variant="outline" className="rounded-full bg-muted/20 border-glass-border/[0.1]">
                  Brand Identity
                </Badge>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-lg font-semibold text-foreground">Award-winning creativity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We transform ideas into stunning digital experiences that captivate audiences and drive results.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full px-6 bg-gradient-glass backdrop-blur-md border border-glass-border/[0.1] hover:border-glass-border/[0.2] hover:bg-glass-frost/[0.08] transition-all group"
                  onClick={() => window.location.href = '/portfolio'}
                >
                  View All Projects
                  <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">●</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right - Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="rounded-full px-4 py-2 bg-gradient-glass backdrop-blur-xl border border-glass-border/[0.1] text-foreground shadow-glass">
                    <project.icon className="w-3 h-3 mr-2 inline" />
                    {project.category}
                  </Badge>
                </div>

                {/* Project info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-accent-warm transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-warm/20 via-transparent to-highlight-magenta/20 blur-xl" />
                </div>

                {/* Hover lift effect */}
                <div className="absolute inset-0 group-hover:-translate-y-1 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom description */}
        <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our portfolio showcases innovative solutions across industries, delivering exceptional user experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
