import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Search, PenTool, Code, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const steps = [
    {
        id: 1,
        title: "Diagnostic & Audit",
        roi: "We find and fix the hidden technical leaks costing you money.",
        description: "Every project begins with a deep dive into your current systems. We audit performance, security, and user friction to identify exactly where you are losing potential revenue.",
        icon: Search,
        color: "accent-warm",
        benefits: ["Data Leakage Check", "Conversion Audit", "Tech Debt Review"],
    },
    {
        id: 2,
        title: "Strategic Engineering",
        roi: "We build the logic that converts traffic into leads/sales.",
        description: "Beyond just 'designing', we engineer a path for your users. We map out high-conversion funnels and automate repetitive administrative tasks to free up your team.",
        icon: PenTool,
        color: "highlight-magenta",
        benefits: ["Funnel Mapping", "Process Automation", "System Architecture"],
    },
    {
        id: 3,
        title: "Precision Build",
        roi: "High-performance systems that require zero babysitting.",
        description: "We develop with a 'build once, scale forever' mindset. Our clean, maintainable code ensures your site stays fast and secure without needing constant manual fixes.",
        icon: Code,
        color: "accent-warm",
        benefits: ["Scalable Infrastructure", "Pixel-Perfect UI", "SEO Optimization"],
    },
    {
        id: 4,
        title: "Launch & Growth",
        roi: "We measure everything to ensure your business actually grows.",
        description: "Launch is only the beginning. We set up real-time ROI tracking and data dashboards so you can see exactly how our work is affecting your bottom line.",
        icon: Rocket,
        color: "highlight-magenta",
        benefits: ["ROI Dashboards", "A/B Testing", "Performance Scaling"],
    },
];

const ProcessSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative py-32 overflow-hidden" id="process">
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[1000px] bg-accent-warm/5 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            {/* Scroll Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-48 bottom-48 w-px bg-glass-border/[0.1] hidden lg:block z-0">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent-warm via-highlight-magenta to-accent-warm origin-top"
                    style={{ scaleY }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <ScrollReveal className="mb-20">
                    <div className="flex flex-col items-start">
                        <Badge variant="secondary" className="rounded-full px-4 py-2 bg-gradient-glass backdrop-blur-md border border-glass-border/[0.06] text-muted-foreground mb-6">
                            Our Method
                        </Badge>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6">
                            <span className="text-foreground">The ROI</span>{" "}
                            <span className="bg-gradient-text bg-clip-text text-transparent">Blueprint</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            Beautiful design is subjective. ROI is not. We use a disciplined, data-driven process to ensure every line of code adds value to your business.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-16 lg:gap-y-24">
                    {steps.map((step, idx) => (
                        <ScrollReveal
                            key={step.id}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className={idx % 2 === 1 ? "lg:mt-32" : ""}
                        >
                            <div
                                className="group relative p-8 md:p-10 rounded-[2.5rem] bg-gradient-glass backdrop-blur-2xl border border-glass-border/[0.06] shadow-glass hover:shadow-card-hover transition-all duration-500 flex flex-col h-full"
                            >
                                {/* Animated hover glow */}
                                <div className="absolute -inset-px rounded-[2.5rem] bg-gradient-to-br from-accent-warm/15 via-transparent to-highlight-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

                                <div className="relative flex-1">
                                    {/* Step Marker & Icon */}
                                    <div className="flex items-center justify-between mb-10">
                                        <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-glass border border-glass-border/[0.1] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                            <step.icon className={`w-10 h-10 ${step.color === 'accent-warm' ? 'text-accent-warm' : 'text-highlight-magenta'}`} />
                                        </div>
                                        <span className="text-6xl font-display font-black text-foreground/5 select-none transition-colors group-hover:text-foreground/10">
                                            0{step.id}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="mb-6">
                                        <Badge className="mb-4 rounded-full px-4 py-1.5 bg-accent-warm/10 text-accent-warm border border-accent-warm/20 text-xs font-bold tracking-wider uppercase">
                                            ROI Impact
                                        </Badge>
                                        <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-accent-warm transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-accent-warm font-medium text-lg leading-snug mb-4">
                                            {step.roi}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed text-base">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Micro-Checklist */}
                                    <div className="space-y-3 mt-8">
                                        {step.benefits.map((benefit) => (
                                            <div key={benefit} className="flex items-center gap-3">
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-warm/20 flex items-center justify-center">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-warm" />
                                                </div>
                                                <span className="text-sm text-foreground/80">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Decorative line */}
                                <div className="relative mt-12 pt-8 border-t border-glass-border/[0.08] flex items-center justify-between overflow-hidden group">
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground/50 uppercase group-hover:text-accent-warm/50 transition-colors">
                                        Phase 0{step.id} Engineering
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-muted-foreground -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Closing Conviction */}
                <ScrollReveal className="mt-20 text-center">
                    <p className="text-muted-foreground mb-8 text-lg italic">
                        "We don't just build websites; we build business tools that work while you sleep."
                    </p>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent-warm to-transparent mx-auto" />
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ProcessSection;
