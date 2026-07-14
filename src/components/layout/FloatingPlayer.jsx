import GlassPanel from "../glass/GlassPanel";

export default function FloatingPlayer() {
    return (
        <div
            style={{
                position: "fixed",
                left: "62%",
                bottom: 42,
                transform: "translateX(-50%)",
                zIndex: 100,
            }}
        >
            <GlassPanel
                style={{
                    width: 750,
                    height: 55,
                    borderRadius: 9999,
                }}
            />
        </div>
    );
}