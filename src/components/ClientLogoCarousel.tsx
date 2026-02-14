import React from 'react';
import { motion } from 'framer-motion';

interface ClientLogoCarouselProps {
    logos: {
        src: string;
        alt: string;
        url?: string;
    }[];
}

const ClientLogoCarousel: React.FC<ClientLogoCarouselProps> = ({ logos }) => {
    // Triple the logos to ensure smooth infinite scrolling
    const tripledLogos = [...logos, ...logos, ...logos];

    return (
        <div className="w-full relative overflow-hidden h-24 flex items-center">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

            <motion.div
                className="flex items-center gap-12 pr-12"
                animate={{
                    x: ["0%", "-33.33%"],
                }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {tripledLogos.map((logo, index) => (
                    <div
                        key={`${logo.alt}-${index}`}
                        className="flex-shrink-0 relative group flex items-center justify-center p-2"
                    >
                        {/* Grayscale to Color Effect & Opacity */}
                        <a
                            href={logo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block transition-all duration-300 ${!logo.url ? 'pointer-events-none' : ''}`}
                        >
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="h-12 w-auto object-contain max-w-[150px]
                            grayscale opacity-70 transition-all duration-300
                            group-hover:grayscale-0 group-hover:opacity-100 group-hover:filter-none
                            filter brightness-0  /* Makes logos black. Removed 'invert' to fix visibility on light background. */
                            "
                                // Note: The user requested "black and white". 
                                // Since the theme is dark (suggested by glassmorphism and "premium"), 
                                // "black and white" likely means "monochrome white/light grey" to be visible against dark bg, 
                                // OR "grayscale". 
                                // "brightness-0 invert" makes it solid white. 
                                // "grayscale" makes it gray.
                                // Let's stick to "grayscale opacity-70" which is standard premium behavior.
                                // BUT, user specifically said "make the logos black and white".
                                // If the background is dark, black logos won't show.
                                // If the background is light, white logos won't show.
                                // The Hero seems to be dark ("glass-dark", "text-white").
                                // So we probably want them WHITE (monochrome).
                                // Let's add specific class handling for this.

                                // REVISING CSS:
                                // brightness-0 invert -> solid white
                                // opacity-70 -> slightly dimmed
                                // group-hover:filter-none -> full color on hover
                                style={
                                    {
                                        // Fallback inline styles if needed
                                    }
                                }
                            />
                        </a>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ClientLogoCarousel;
