import GlassPanel from "./GlassPanel";

export default function GlassSlideout({
    open,
    width = 360,
    children,
}) {
    return (
        <div
            style={{
                position: "fixed",

                top: 0,
                right: 0,
                bottom: 0,

                width,

                transform: open
                    ? "translateX(0)"
                    : `translateX(${width}px)`,

                transition: "transform 260ms ease",

                zIndex: 200,
            }}
        >
            <GlassPanel
                style={{
                    width: "100%",
                    height: "100%",

                    borderRadius: 0,

                    borderLeft: "none",
                }}
            >
                {children}
            </GlassPanel>
        </div>
    );
}