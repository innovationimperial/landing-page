import { motion, useInView, Variant, Transition } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    variants?: {
        hidden: Variant;
        visible: Variant;
    };
    transition?: Transition;
    className?: string;
    once?: boolean;
}

export const ScrollReveal = ({
    children,
    width = "100%",
    variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
    transition = { duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] },
    className = "",
    once = true,
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }} className={className}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={transition}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
