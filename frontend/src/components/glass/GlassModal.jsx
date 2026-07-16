import { useTheme } from "../../context/ThemeContext";

import { useState, useRef, useEffect, } from "react";

import avatar from "../../assets/images/avatar.png";
import ThemeToggle from "../common/ThemeToggle";

import {
    UserRound,
    Save,
} from "lucide-react";

export default function GlassModal({
    open,
    onClose,
    onSignOut,
    onSave,
    width = 520,
    children,
}) {
    const { theme } = useTheme();
    const dark = theme.mode === "dark";
    const [hover, setHover] = useState(false);

    const [name, setName] = useState("Keeno Smith");
    const [email, setEmail] = useState("keeno@email.com");

    // focus on name input on open 
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (open) {
            nameInputRef.current?.focus();
        }
    }, [open]);

    if (!open) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                zIndex: 1000,

                backdropFilter: "blur(13px)",
                WebkitBackdropFilter: "blur(13px)",

                background: dark
                    ? "rgba(0,0,0,0.10)"
                    : "rgba(255, 255, 255, 0)",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: 550,
                    height: 620,

                    padding: 32,

                    borderRadius: 34,

                    background: theme.colors.glass,
                    border: `1px solid ${theme.colors.glassBorder}`,

                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",

                    boxShadow: dark
                        ? `
                0 18px 60px rgba(0,0,0,0.45),
                inset 0 1px 0 rgba(255,255,255,0.05)
            `
                        : `
                0 18px 60px rgba(0,0,0,0.10),
                inset 0 1px 0 rgba(255,255,255,0.85)
            `,
                }}
            >
                {/* container */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        padding: 36,
                    }}
                >
                    {/* x to right */}
                    <div
                        onClick={() => {
                            setHover(false);
                            onClose?.();
                        }}
                        style={{
                            position: "absolute",

                            top: 22,
                            right: 24,

                            width: 30,
                            height: 30,

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            cursor: "pointer",

                            opacity: hover ? 1 : 0,

                            transition: "opacity 180ms ease",

                            color: theme.colors.textSecondary,

                            ...theme.typography.body,
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        ×
                    </div>

                    {/* avatar */}
                    <img
                        src={avatar}
                        alt="Profile"
                        style={{
                            width: 92,
                            height: 92,

                            borderRadius: "50%",

                            objectFit: "cover",

                            alignSelf: "center",

                            marginTop: 12,
                        }}
                    />

                    {/* name */}
                    <div
                        style={{
                            marginTop: 20,

                            textAlign: "center",

                            color: theme.colors.text,

                            ...theme.typography.modal,
                        }}
                    >
                        {name || "Your Name"}
                    </div>

                    {/* email */}
                    <div
                        style={{
                            marginTop: 8,

                            textAlign: "center",

                            color: theme.colors.textSecondary,

                            ...theme.typography.body,
                        }}
                    >
                        {email || "email@example.com"}
                    </div>

                    {/* inputs */}
                    <div
                        style={{
                            marginTop: 40,

                            display: "flex",
                            flexDirection: "column",

                            gap: 22,
                        }}
                    >
                        {/* Name */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                            }}
                        >

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                ref={nameInputRef}
                                placeholder="Your name"
                                style={{
                                    width: "100%",
                                    height: 42,

                                    padding: "0 18px",

                                    border: "none",
                                    outline: "none",

                                    borderRadius: 9999,

                                    background:
                                        theme.mode === "dark"
                                            ? "rgba(50, 50, 50, 0)"
                                            : "rgba(255, 255, 255, 0)",

                                    boxShadow:
                                        theme.mode === "dark"
                                            ? `
                            0 6px 18px rgba(0,0,0,0.22),
                            inset 0 1px 0 rgba(255,255,255,0.04)
                        `
                                            : `
                            0 10px 28px rgba(0, 0, 0, 0),
                            0 1px 2px rgba(0, 0, 0, 0.04),
                            inset 0 1px 0 rgba(255,255,255,0.9)
                        `,

                                    color: theme.colors.text,

                                    transition: "all 220ms ease",

                                    ...theme.typography.body,
                                }}
                            />
                        </div>

                        {/* Email */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                            }}
                        >

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                style={{
                                    width: "100%",
                                    height: 42,

                                    padding: "0 18px",

                                    border: "none",
                                    outline: "none",

                                    borderRadius: 9999,

                                    background:
                                        theme.mode === "dark"
                                            ? "rgba(50, 50, 50, 0)"
                                            : "rgba(255,255,255,0.55)",

                                    boxShadow:
                                        theme.mode === "dark"
                                            ? `
                            0 6px 18px rgba(0,0,0,0.22),
                            inset 0 1px 0 rgba(255,255,255,0.04)
                        `
                                            : `
                            0 10px 28px rgba(0, 0, 0, 0),
                            0 1px 2px rgba(0, 0, 0, 0.04),
                            inset 0 1px 0 rgba(255,255,255,0.9)
                        `,

                                    color: theme.colors.text,

                                    transition: "all 220ms ease",

                                    ...theme.typography.body,
                                }}
                            />
                        </div>
                    </div>

                    {/* Appearance */}
                    {/* make this go to the right and add Appearance text */}
                    <div
                        style={{
                            marginTop: 20,

                            display: "flex-end",
                        }}
                    >
                        <ThemeToggle />
                    </div>

                    {/* bottom buttons */}
                    <div
                        style={{
                            marginTop: "80px",

                            display: "flex",
                            justifyContent: "flex-end",

                            gap: 12,
                        }}
                    >
                        {/* Sign Out */}
                        <button
                            onClick={() => {
                                onSignOut?.();
                                onClose?.();
                            }}
                            style={{
                                width: 180,
                                height: 38,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,

                                border: "none",
                                outline: "none",

                                cursor: "pointer",

                                borderRadius: 9999,

                                background:
                                    theme.mode === "dark"
                                        ? "rgba(50,50,50,0.08)"
                                        : "rgba(255,255,255,0.55)",

                                boxShadow:
                                    theme.mode === "dark"
                                        ? `
                        0 6px 18px rgba(0,0,0,0.22),
                        inset 0 1px 0 rgba(255,255,255,0.04)
                    `
                                        : `
                        0 10px 28px rgba(0,0,0,0.08),
                        0 1px 2px rgba(0,0,0,0.05),
                        inset 0 1px 0 rgba(255,255,255,0.9)
                    `,

                                color: theme.colors.text,

                                transition: "all 220ms ease",

                                ...theme.typography.buttonSecondary,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <UserRound
                                size={16}
                                strokeWidth={1}
                            />

                            <span>Sign Out</span>
                        </button>

                        {/* Save */}
                        <button
                            onClick={() => {
                                onSave?.();
                            }}
                            style={{
                                width: 180,
                                height: 38,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,

                                border: "none",
                                outline: "none",

                                cursor: "pointer",

                                borderRadius: 9999,

                                // background: theme.mode === "dark" ? "rgba(50,50,50,0.08)" : "rgba(255,255,255,0.55)",
                                background: theme.mode === "dark" ? "#cd3328" : "#e31515",

                                boxShadow:
                                    theme.mode === "dark"
                                        ? `
                        0 6px 18px rgba(0,0,0,0.22),
                        inset 0 1px 0 rgba(255,255,255,0.04)
                    `
                                        : `
                        0 10px 28px rgba(0,0,0,0.08),
                        0 1px 2px rgba(0,0,0,0.05),
                        inset 0 1px 0 rgba(255,255,255,0.9)
                    `,

                                color: theme.mode === "dark" ? theme.colors.text : "#ecece8",
                                // color: "#6a2e2a",

                                transition: "all 220ms ease",

                                ...theme.typography.buttonSecondary,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <Save
                                size={16}
                                strokeWidth={1}
                            />

                            <span>Save</span>
                        </button>
                    </div>

                </div>
                {children}
            </div>
        </div >
    );
}