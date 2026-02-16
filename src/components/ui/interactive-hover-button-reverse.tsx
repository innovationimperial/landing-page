import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonReverseProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

const InteractiveHoverButtonReverse = React.forwardRef<
    HTMLButtonElement,
    InteractiveHoverButtonReverseProps
>(({ text = "Button", className, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "group relative w-44 cursor-pointer overflow-hidden rounded-full border border-white/40 bg-transparent p-2 text-center font-semibold text-white transition-colors duration-300 hover:border-purple-600 hover:text-white",
                className,
            )}
            {...props}
        >
            {/* Initial Text - Slides Left on Hover */}
            <span className="inline-block transition-all duration-300 group-hover:-translate-x-12 group-hover:opacity-0 mr-4">
                {text}
            </span>

            {/* Revealed Text - Slides in from Right? No, if we fill from Right, text should slide Left? 
                Original: Text slides Right (translate-x-12). Revealed text comes from Left (-translate-x-12).
                For R->L fill:
                Initial Text: Should slide Left (-translate-x-12).
                Revealed Text: Should slide in from Right (translate-x-12).
            */}
            <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <span>{text}</span>
                <ArrowRight className="w-4 h-4" />
            </div>

            {/* The Arrow/Dot Element - Starts on Right, Expands Left */}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 scale-[1] rounded-full bg-purple-600 transition-all duration-300 group-hover:right-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:translate-y-0 group-hover:scale-[1.8] group-hover:rounded-none z-0 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />
            </div>
        </button>
    );
});

InteractiveHoverButtonReverse.displayName = "InteractiveHoverButtonReverse";

export { InteractiveHoverButtonReverse };
