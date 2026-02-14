import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const ProjectShowcase: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
    const frame = useCurrentFrame();
    const { height, width } = useVideoConfig();

    // Slow pan effect
    const translateY = interpolate(frame, [0, 300], [0, -height * 0.5], {
        extrapolateRight: "clamp",
    });

    // Subtle zoom effect
    const scale = interpolate(frame, [0, 300], [1, 1.1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    transform: `scale(${scale}) translateY(${translateY}px)`,
                    transition: "transform 0.1s linear",
                }}
            >
                <img
                    src={imageUrl}
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                    }}
                    alt="Project Preview"
                />
            </div>

            {/* Cinematic Vignette Overlay */}
            <AbsoluteFill
                style={{
                    boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
                    background: "linear-gradient(to top, rgba(13,5,20,0.8) 0%, transparent 40%)",
                }}
            />
        </AbsoluteFill>
    );
};
