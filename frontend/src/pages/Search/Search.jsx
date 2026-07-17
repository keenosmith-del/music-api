import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useState } from "react";

import React from "react";

import {
    Play,
} from "lucide-react";

export default function Search() {
    const { theme } = useTheme();

    const categories = [
        {
            title: "Rock"
        },
        {
            title: "Hits"
        },
        {
            title: "Concert"
        },
        {
            title: "Chill"
        },
        {
            title: "Charts"
        },
        {
            title: "Hip Hop"
        },

        {
            title: "Live"
        },
        {
            title: "R&B"
        },
        {
            title: "Pop"
        },
        {
            title: "Gospel"
        },
        {
            title: "Dance"
        },
        {
            title: "Alternative"
        },

        {
            title: "2010s"
        },
        {
            title: "2000s"
        },
        {
            title: "'90s'"
        },
        {
            title: "'80s'"
        },
        {
            title: "'70s'"
        },
        {
            title: "Jazz"
        },

        {
            title: "Sleep"
        },
        {
            title: "Country"
        },
        {
            title: "Essentials"
        },
        {
            title: "Chill"
        },
        {
            title: "Focus"
        },
        {
            title: "Feel Good"
        },

        {
            title: "Love"
        },
        {
            title: "Party"
        },
        {
            title: "Soul/Funk"
        },
        {
            title: "Oldies"
        },
        {
            title: "Reggae"
        },
        {
            title: "Metal"
        },
    ];

    return (
        <div
            style={{
                padding: "40px",
                paddingBottom: "220px",
            }}
        >
            {/* ---------- Browse Categories ---------- */}
            <div
                style={{
                    marginBottom: 54,
                }}
            >
                {/* Row Heading */}
                <h2
                    style={{
                        color: theme.colors.text,

                        marginBottom: 18,

                        ...theme.typography.rowHeading,
                    }}
                >
                    Browse Categories
                </h2>

                {/* Scrollable Tiles */}
                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",

                        gap: 24,

                        paddingBottom: 8,
                    }}
                >
                    {categories.map(({ title }, index) => (
                        <div
                            key={index}
                            style={{
                                width: "100%",

                                display: "flex",
                                flexDirection: "column",

                                gap: 14,

                                cursor: "pointer",
                            }}
                        >
                            {/* artwork */}
                            <div
                                style={{
                                    position: "relative",

                                    height: 145,

                                    borderRadius: 26,

                                    overflow: "visible",

                                    background:
                                        theme.mode === "dark"
                                            ? index % 2 === 0
                                                ? "rgba(31, 31, 31, 0.05)"
                                                : "rgba(29, 29, 29, 0.08)"
                                            : index % 2 === 0
                                                ? "rgba(255,255,255,0.45)"
                                                : "rgba(255,255,255,0.70)",

                                    boxShadow:
                                        theme.mode === "dark"
                                            ? "0 12px 28px rgba(0,0,0,0.30)"
                                            : `
                            0 12px 28px rgba(0,0,0,0.08),
                            inset 0 1px 0 rgba(255,255,255,0.95)
                          `,
                                }}
                                onMouseEnter={(e) => {
                                    const play = e.currentTarget.querySelector(".tile-play-button");

                                    if (play) {
                                        play.style.opacity = "1";
                                        play.style.transform = "translateY(0) scale(1)";
                                    }
                                }}

                                onMouseLeave={(e) => {
                                    const play = e.currentTarget.querySelector(".tile-play-button");

                                    if (play) {
                                        play.style.opacity = "0";
                                        play.style.transform = "translateY(6px) scale(.92)";
                                    }
                                }}
                            >
                                {/* title */}
                                <div
                                    style={{
                                        position: "absolute",

                                        left: 20,
                                        bottom: 20,

                                        color: theme.colors.text,

                                        ...theme.typography.title,
                                    }}
                                >
                                    {title}
                                </div>

                                {/* play button */}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setCurrentTime(0);

                                        setHasTrack(true);
                                        setIsPlaying(true);
                                    }}
                                    style={{
                                        position: "absolute",

                                        right: 18,
                                        bottom: 18,

                                        width: 44,
                                        height: 44,

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        borderRadius: "50%",

                                        opacity: 0,

                                        transform: "translateY(6px) scale(.92)",

                                        transition: "all 220ms ease",

                                        background:
                                            theme.mode === "dark"
                                                ? "rgba(13, 13, 13, 0.06)"
                                                : "rgba(255,255,255,0.28)",

                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 8px 18px rgba(0,0,0,.35)"
                                                : `
                    0 8px 18px rgba(0,0,0,.08),
                    inset 0 1px 0 rgba(255,255,255,.9)
                `,
                                    }}
                                    className="tile-play-button"
                                >
                                    <Play
                                        size={18}
                                        strokeWidth={1.75}
                                        fill={theme.colors.text}
                                        color={theme.colors.text}
                                        style={{
                                            marginLeft: 2,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}