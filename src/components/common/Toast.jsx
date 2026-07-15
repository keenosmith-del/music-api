import { useTheme } from "../../context/ThemeContext";

import { Check } from "lucide-react";

export default function Toast({
    open,
    message,
}) {
    const { theme } = useTheme();

    const dark = theme.mode === "dark";

    return (
        <div
            style={{
                position: "fixed",

                top: 24,
                right: 24,

                zIndex: 3000,

                width: 180,
                height: 38,

                display: "flex",
                alignItems: "center",
                gap: 10,

                padding: "0 18px",

                borderRadius: 9999,

                background: theme.colors.glass,
                border: `1px solid ${theme.colors.glassBorder}`,

                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",

                boxShadow: dark
                    ? `
                        0 12px 34px rgba(0,0,0,.38),
                        inset 0 1px 0 rgba(255,255,255,.05)
                    `
                    : `
                        0 12px 34px rgba(0,0,0,.08),
                        inset 0 1px 0 rgba(255,255,255,.9)
                    `,

                color: theme.colors.text,

                transform: open
                    ? "translateY(0)"
                    : "translateY(-18px)",

                opacity: open ? 1 : 0,

                pointerEvents: "none",

                transition:
                    "opacity 220ms ease, transform 220ms ease",

                ...theme.typography.button,
            }}
        >
            <Check
                size={15}
                strokeWidth={1.75}
                color={theme.colors.text}
            />

            <span>{message}</span>
        </div>
    );
}