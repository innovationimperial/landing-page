import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion"; // removed unused useSpring
import { Badge } from "@/components/ui/badge";
import { Code, MoveLeft, MoveRight } from "lucide-react"; // removed unused Sparkles
import portfolioData from "../../research/portfolio_data.json";

// --- Types ---
interface CardProps {
    project: {
        title: string;
        logo?: string;
        url: string;
        // Add other properties from portfolioData as needed
    };
    index: number;
}

// --- ASCII Generator ---
const generateAscii = (width: number, height: number, density: number = 0.5) => {
    const chars = "0101010101{}[]<>;:,._-+=!@#$%^&*";
    let output = "";
    for (let y = 0; y < height; y++) {
        let line = "";
        for (let x = 0; x < width; x++) {
            if (Math.random() < density) {
                line += chars[Math.floor(Math.random() * chars.length)];
            } else {
                line += " ";
            }
        }
        output += line + "\n";
    }
    return output;
};

// --- Particle Background (Three.js) ---
const ParticleBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Setup
        const scene = new THREE.Scene();
        // Adjust camera to fit container properly
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        const updateSize = () => {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            renderer.setSize(clientWidth, clientHeight);

            // Update ortho camera
            camera.left = -clientWidth / 2;
            camera.right = clientWidth / 2;
            camera.top = clientHeight / 2;
            camera.bottom = -clientHeight / 2;
            camera.updateProjectionMatrix();
        };

        updateSize();
        containerRef.current.appendChild(renderer.domElement);

        // Particles
        const particleCount = 150;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount); // x velocity
        const sizes = new Float32Array(particleCount);
        const alphas = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // Random spread
            positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 1.5; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 600; // y
            positions[i * 3 + 2] = 0; // z

            velocities[i] = Math.random() * 0.2 + 0.05;
            sizes[i] = Math.random() * 3 + 1;
            alphas[i] = Math.random() * 0.4 + 0.1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

        // Shader Material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color('#fca311') } // accent-warm default
            },
            vertexShader: `
                attribute float size;
                attribute float alpha;
                varying float vAlpha;
                void main() {
                    vAlpha = alpha;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size; 
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying float vAlpha;
                void main() {
                    float r = distance(gl_PointCoord, vec2(0.5));
                    if (r > 0.5) discard;
                    gl_FragColor = vec4(color, vAlpha * (1.0 - 2.0 * r));
                }
            `,
            transparent: true,
            depthWrite: false,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Animation Loop
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            const positionMap = geometry.attributes.position.array as Float32Array;
            // Use renderer width to determine wrap-around
            const width = renderer.domElement.width;

            for (let i = 0; i < particleCount; i++) {
                positionMap[i * 3] += velocities[i];

                // Wrap around logic
                if (positionMap[i * 3] > width / 1.5) {
                    positionMap[i * 3] = -width / 1.5;
                }
            }
            geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();
        window.addEventListener('resize', updateSize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', updateSize);
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };

    }, []);

    return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-30" />;
}


// --- Single Card Component ---
const Card = ({ project }: CardProps) => {
    // Generate static wireframe pattern for "blueprint" look
    const wireframePattern = useMemo(() => {
        return `data:image/svg+xml;base64,${btoa(`
            <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(252, 163, 17, 0.2)" stroke-width="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="#050505" />
                <rect width="100%" height="100%" fill="url(#grid)" />
                <rect x="20" y="20" width="100" height="20" fill="rgba(252, 163, 17, 0.1)" stroke="rgba(252, 163, 17, 0.5)" />
                <rect x="20" y="50" width="360" height="100" fill="none" stroke="rgba(252, 163, 17, 0.3)" stroke-dasharray="5,5" />
                <circle cx="360" cy="30" r="15" fill="none" stroke="rgba(252, 163, 17, 0.5)" />
                <rect x="20" y="160" width="80" height="80" fill="none" stroke="rgba(252, 163, 17, 0.3)" />
                <rect x="110" y="160" width="270" height="80" fill="rgba(252, 163, 17, 0.05)" />
            </svg>
        `)}`;
    }, []);

    const [ascii, setAscii] = useState("");

    // Update ASCII occasionally for "live code" effect
    useEffect(() => {
        setAscii(generateAscii(50, 20, 0.3));
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                setAscii(generateAscii(50, 20, 0.3));
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    // --- Position tracking ---
    // Flow: Right → Left ("unshredding").
    // Cards enter from the RIGHT as Blueprint (codebase/architecture).
    // As a card passes the center scanner, the Blueprint peels away from the LEFT
    // to reveal the Production/Reality underneath.
    // This creates the "unshredding" effect — building up the final product.

    const cardRef = useRef<HTMLDivElement>(null);
    const [clipPercent, setClipPercent] = useState(0);
    const [isScanned, setIsScanned] = useState(false);

    useEffect(() => {
        let rAf: number;
        const checkPosition = () => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                const centerX = window.innerWidth / 2;

                const cardLeft = rect.left;
                const cardWidth = rect.width;

                // Card moves Right → Left.
                // When card is far right (incoming): cardLeft > centerX. Blueprint fully visible. clipPercent = 0.
                // When card crosses center: cardLeft < centerX.
                // Distance passed = centerX - cardLeft.
                // Percentage = (distance / cardWidth) * 100.
                // When card is far left (outgoing): fully revealed. clipPercent = 100.

                const distanceFromCenter = centerX - cardLeft;
                const percent = (distanceFromCenter / cardWidth) * 100;

                const safePercent = Math.min(100, Math.max(0, percent));

                setClipPercent(safePercent);
                setIsScanned(safePercent > 0 && safePercent < 100);
            }
            rAf = requestAnimationFrame(checkPosition);
        }
        checkPosition();
        return () => cancelAnimationFrame(rAf);
    }, []);


    return (
        <div ref={cardRef} className="relative w-[400px] h-[250px] rounded-xl overflow-hidden flex-shrink-0 mx-6 bg-black border border-white/10 group shadow-2xl">

            {/* LAYER 1: REALITY (Base) - Always visible underneath */}
            <div className="absolute inset-0 bg-background">
                <img
                    src={project.logo || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover filter brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-xl">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-white/70 text-xs font-mono uppercase tracking-widest">Live System</p>
                    </div>
                </div>
            </div>

            {/* LAYER 2: BLUEPRINT (Overlay) - Clips from the left as card passes scanner */}
            <div
                className="absolute inset-0 bg-[#050505]"
                style={{
                    clipPath: `inset(0 0 0 ${clipPercent}%)`,
                    transition: 'clip-path 0.1s linear'
                }}
            >
                {/* Wireframe Grid */}
                <div className="absolute inset-0 w-full h-full opacity-30" style={{ backgroundImage: `url("${wireframePattern}")` }} />

                {/* ASCII Code Overlay */}
                <pre className="absolute inset-0 p-6 text-[10px] leading-[14px] font-mono text-accent-warm/60 overflow-hidden pointer-events-none select-none opacity-80 whitespace-pre-wrap break-all">
                    {ascii}
                </pre>

                <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-accent-warm/10 border-accent-warm/50 text-accent-warm text-[9px] px-2 py-0.5 uppercase tracking-wider backdrop-blur-md">
                        <Code className="w-3 h-3 mr-1 inline" />
                        Blueprint_V1.0
                    </Badge>
                </div>

                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-warm/5 to-transparent bg-[length:100%_4px] pointer-events-none opacity-50" />
            </div>

            {/* Scanner Highlight Line (The "Laser") */}
            {isScanned && (
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-accent-warm shadow-[0_0_15px_rgba(252,163,17,0.8)] z-50 pointer-events-none"
                    style={{ left: `${clipPercent}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[300px] bg-gradient-to-b from-transparent via-accent-warm/20 to-transparent blur-md" />
                </div>
            )}
        </div>
    );
};


// --- Main Component ---
const BlueprintShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

    // Duplicate data for infinite loop (enough to fill screen + buffer)
    const cards = [...portfolioData, ...portfolioData, ...portfolioData, ...portfolioData];

    return (
        <motion.section
            ref={containerRef}
            style={{ opacity, scale }}
            className="relative py-32 overflow-hidden bg-black border-y border-white/5"
        >
            {/* Backgrounds */}
            <ParticleBackground />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-20 pointer-events-none" />

            <div className="relative z-30 max-w-7xl mx-auto px-6 mb-16 text-center">
                <Badge variant="outline" className="mb-6 rounded-full px-4 py-1.5 bg-highlight-magenta/10 border-highlight-magenta/30 text-highlight-magenta">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight-magenta opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight-magenta"></span>
                    </span>
                    System Transparent
                </Badge>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
                    From <span className="text-accent-warm italic">Blueprint</span> to <span className="text-white">Reality</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                    Transparent engineering. Scanning our production database to reveal the robust architecture behind every pixel we deploy.
                </p>
            </div>

            {/* Scanner Center Line Indicator */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-warm/50 to-transparent z-40 hidden md:block">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full border border-accent-warm/30 animate-[spin_4s_linear_infinite]" />
                            <div className="w-8 h-8 rounded-full border border-dashed border-accent-warm/50 absolute top-2 left-2 animate-[spin_3s_linear_infinite_reverse]" />
                            <div className="w-2 h-2 rounded-full bg-accent-warm absolute top-5 left-5 shadow-[0_0_10px_orange]" />
                        </div>
                        <div className="px-3 py-1 bg-black/80 backdrop-blur border border-accent-warm/20 rounded-full text-[9px] font-mono text-accent-warm uppercase tracking-[0.2em] whitespace-nowrap shadow-glass">
                            Decryption Active
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee Stream — flows Right → Left */}
            <div className="relative w-full py-10 z-20">
                <motion.div
                    className="flex w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 120
                    }}
                >
                    {cards.map((project, idx) => (
                        <Card
                            key={`${project.title}-${idx}`}
                            project={project}
                            index={idx}
                        />
                    ))}
                </motion.div>
            </div>


            {/* Interaction Hint — Production on left, Codebase on right */}
            <div className="relative z-30 flex justify-center items-center gap-12 mt-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 text-white font-mono text-sm tracking-widest uppercase">
                        <MoveLeft className="w-4 h-4" />
                        <span>Production</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">User Interface & UX</span>
                </div>

                <div className="h-12 w-px bg-white/10" />

                <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2 text-accent-warm font-mono text-sm tracking-widest uppercase">
                        <span>Codebase</span>
                        <MoveRight className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">Backend & Architecture</span>
                </div>
            </div>

        </motion.section>
    );
};

export default BlueprintShowcase;
