import { useTheme } from "../../context/ThemeContext";

export default function GlassPanel({
    children,
    style = {},
    blur = true,
}) {
    const { theme } = useTheme();

    const dark = theme.mode === "dark";

    return (
        <div
            style={{
                background: theme.colors.glass,

                // border: `1px solid ${theme.colors.glassBorder}`,

                // blur for panels
                backdropFilter: blur ? "blur(7px)" : undefined,
                WebkitBackdropFilter: blur ? "blur(7px)" : undefined,

                borderRadius: 32,

                boxShadow: dark
                    ? `
                        0 8px 32px rgba(0,0,0,0.35),
                        inset 0 1px 0 rgba(255,255,255,0.05)
                      `
                    : "0 10px 35px rgba(0,0,0,0.08)",

                transition: "all 300ms ease",

                ...style,
            }}
        >
            {children}
        </div>
    );
}