import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Contact";
import projectsData from "../../research/portfolio_data.json";
import { ExternalLink, X } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.2, 0.9, 0.2, 1.0] as [number, number, number, number],
        },
    },
};

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState<any>(null);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            <Navigation />

            <main className="container mx-auto px-6 pt-40 pb-20">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-20 text-center relative"
                >
                    {/* Cosmic Glow Background for Header */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 bg-primary/10 blur-[120px] -z-10" />

                    <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white via-white/90 to-primary/40 bg-clip-text text-transparent italic">
                        PROJECT<br />MULTIVERSE
                    </h1>
                    <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium text-balance">
                        A dimension of digital excellence where precision engineering meets high-fidelity aesthetics.
                    </p>
                </motion.header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
                >
                    {projectsData.map((project, index) => {
                        const spans = index % 5 === 0 ? "lg:col-span-8" : index % 5 === 1 ? "lg:col-span-4" : "lg:col-span-4";

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`${spans} group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-glass backdrop-blur-3xl transition-all duration-500 hover:border-primary/30 hover:shadow-card-hover cursor-pointer`}
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="aspect-[16/10] w-full overflow-hidden relative">
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={`/portfolio/${project.screenshot}`}
                                            alt={project.title}
                                            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity z-10" />

                                    {project.status === "404" && (
                                        <div className="absolute top-6 right-6 z-20">
                                            <div className="px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 backdrop-blur-md text-destructive text-[10px] font-bold tracking-widest uppercase animate-pulse">
                                                Maintenance Mode
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-10">
                                    <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg line-clamp-2 mb-8 leading-relaxed font-light">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <button
                                            className="group/link flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
                                        >
                                            View Details
                                            <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent-warm/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </main>

            <Footer />

            <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/80 backdrop-blur-2xl border-white/10 rounded-[2.5rem] shadow-2xl transition-all duration-500 scale-in-center">
                    {selectedProject && (
                        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                            <div className="w-full md:w-3/5 aspect-video md:aspect-auto relative overflow-hidden bg-black">
                                <img
                                    src={`/portfolio/${selectedProject.screenshot}`}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent pointer-events-none" />
                            </div>

                            <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                                <DialogHeader className="mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-1 w-12 bg-primary rounded-full" />
                                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Intelligence Node</span>
                                    </div>
                                    <DialogTitle className="text-4xl font-black tracking-tighter leading-none mb-4 italic">
                                        {selectedProject.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-muted-foreground text-lg leading-relaxed font-light mb-8">
                                        {selectedProject.description}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                                            <p className="text-sm font-semibold">{selectedProject.status === "404" ? "Maintenance" : "Live"}</p>
                                        </div>
                                        <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Type</p>
                                            <p className="text-sm font-semibold italic">Elite Solution</p>
                                        </div>
                                    </div>

                                    <a
                                        href={selectedProject.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full py-5 rounded-[1.5rem] bg-primary text-white font-bold hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
                                    >
                                        Launch Core Application
                                        <ExternalLink className="w-5 h-5" />
                                    </a>

                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="w-full py-4 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                                    >
                                        Close Terminal session
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Portfolio;
