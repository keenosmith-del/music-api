import { forwardRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const GlassMenu = forwardRef(function GlassMenu(
    {
        open,
        top,
        left,
        width = 200,
        children,
    },
    ref
) {
    const { theme } = useTheme();
    const dark = theme.mode === "dark";

    return (
        <div
            ref={ref}
            style={{
                position: "fixed",

                top,
                left,

                width,

                opacity: open ? 1 : 0,

                transform: open
                    ? "translateY(0)"
                    : "translateY(8px)",

                pointerEvents: open ? "auto" : "none",

                transition:
                    "opacity 180ms ease, transform 180ms ease",

                zIndex: 500,
            }}
        >
            <div
                style={{
                    padding: 12,
                    borderRadius: 24,

                    background: theme.colors.glass,
                    border: `1px solid ${theme.colors.glassBorder}`,

                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",

                    boxShadow: dark
                        ? "0 8px 32px rgba(0, 0, 0, 0.23)"
                        : "0 10px 35px rgba(0,0,0,0.08)",
                }}
            >
                {children}
            </div>
        </div>
    );
});

export default GlassMenu;