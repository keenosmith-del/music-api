// main content within

import AppCanvas from "./AppCanvas";

import ThemeToggle from "../common/ThemeToggle";

import { useTheme } from "../../context/ThemeContext";

import { useState } from "react";

import React from "react";

import {
    AudioLines,
    UserRound,
    Music,
} from "lucide-react";

export default function AppLayout({
    sidebar,
    children,
    player,
}) {
    // STATES 
    const { theme } = useTheme();

    const dark = theme.mode === "dark";

    // temp;; const signedIn = !!user;
    const [signedIn, setSignedIn] = useState(false);

    return (
        <AppCanvas>
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                }}
            >
                {sidebar && React.cloneElement(sidebar, { signedIn, setSignedIn })}
                <div
                    style={{
                        position: "fixed",
                        top: 24,
                        right: 24,
                        zIndex: 1000,
                    }}
                >
                    <ThemeToggle />
                </div>

                {/* main test */}
                <main
                    style={{
                        flex: 1,
                        minHeight: "100vh",
                        position: "relative",
                        overflowY: "auto",
                    }}
                >
                    {signedIn ? (
                        <div
                            style={{
                                padding: "40px",
                                paddingBottom: "220px",
                            }}
                        >
                            <h1
                                style={{
                                    color: theme.colors.text,
                                    marginBottom: 40,
                                    ...theme.typography.display,
                                }}
                            >
                                Browse
                            </h1>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                                    gap: 24,
                                }}
                            >
                            </div>
                        </div>

                    ) : (
                        <div
                            style={{
                                minHeight: "100vh",

                                display: "flex",
                                flexDirection: "column",

                                alignItems: "center",
                                justifyContent: "center",

                                textAlign: "center",

                                padding: 40,
                            }}
                        >
                            {/* LOGO + NAME */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,

                                    marginBottom: 15,
                                }}
                            >
                                <AudioLines
                                    size={22}
                                    strokeWidth={1.5}
                                    color={theme.colors.textSecondary}
                                />

                                <span
                                    style={{
                                        color: theme.colors.textSecondary,
                                        ...theme.typography.title,
                                    }}
                                >
                                    Music
                                </span>
                            </div>

                            {/* HEADING */}
                            <div
                                style={{
                                    marginTop: 18,
                                    marginBottom: 40,

                                    maxWidth: "50%",

                                    color: theme.colors.text,

                                    ...theme.typography.heading,
                                }}
                            >
                                Discover new music every day.
                            </div>

                            {/* LOGO */}
                            <AudioLines
                                size={90}
                                strokeWidth={1}
                                color={theme.colors.text}
                            />

                            {/* DISCRIPTION */}
                            <div
                                style={{
                                    width: 440,

                                    maxWidth: "100%",

                                    marginTop: 60,

                                    color: theme.colors.textSecondary,

                                    lineHeight: 1.7,

                                    ...theme.typography.body,
                                }}
                            >
                                Get playlists and albums inspired by the artists and genres you're listening to.
                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={() => setSignedIn(true)}
                                style={{
                                    width: "250px",

                                    height: 42,
                                    padding: "0 26px",
                                    marginTop: 30,

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
                                            ? "rgba(50, 50, 50, 0.08)"
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

                                    ...theme.typography.button,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow =
                                        theme.mode === "dark"
                                            ? `
                0 10px 24px rgba(0,0,0,0.30),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `
                                            : `
                0 16px 34px rgba(0,0,0,0.12),
                0 2px 4px rgba(0,0,0,0.05),
                inset 0 1px 0 rgba(255,255,255,1)
              `;
                                }}

                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        theme.mode === "dark"
                                            ? `
                0 6px 18px rgba(0,0,0,0.22),
                inset 0 1px 0 rgba(255,255,255,0.04)
              `
                                            : `
                0 10px 28px rgba(0,0,0,0.08),
                0 1px 2px rgba(0,0,0,0.05),
                inset 0 1px 0 rgba(255,255,255,0.9)
              `;
                                }}
                            >
                                <UserRound
                                    size={16}
                                    strokeWidth={1}
                                />

                                <span>Sign In</span>
                            </button>

                        </div>

                    )}

                    {children}
                </main>

                {player &&
                    React.cloneElement(player, {
                        signedIn,
                    })}
            </div>
        </AppCanvas>
    );
}