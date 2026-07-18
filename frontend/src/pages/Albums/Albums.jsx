// added when + added to library clicked, all albums
// can be favourited or not

import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useState } from "react";

import React from "react";

import {
    Play,
    Star,
} from "lucide-react";

export default function Albums() {
    const { theme } = useTheme();

    const {
        setCurrentTime,
        setHasTrack,
        setIsPlaying,
    } = useApp();

    const albums = [
        {
            title: "Album 1",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 2",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 3",
            explicit: false,
            favourite: true,
        },
        {
            title: "Album 4",
            explicit: true,
            favourite: false,
        },
        {
            title: "Album 5",
            explicit: false,
            favourite: false,
        },
        {
            title: "Album 6",
            explicit: true,
            favourite: false,
        },

        {
            title: "Album 7",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 8",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 9",
            explicit: true,
            favourite: false,
        },
        {
            title: "Album 10",
            explicit: false,
            favourite: true,
        },
        {
            title: "Album 11",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 12",
            explicit: true,
            favourite: true,
        },

        {
            title: "Album 13",
            explicit: false,
            favourite: true,
        },
        {
            title: "Album 14",
            explicit: true,
            favourite: false,
        },
        {
            title: "Album 15",
            explicit: false,
            favourite: false,
        },
        {
            title: "Album 16",
            explicit: false,
            favourite: false,
        },
        {
            title: "Album 17",
            explicit: false,
            favourite: false,
        },
        {
            title: "Album 18",
            explicit: true,
            favourite: false,
        },

        {
            title: "Album 19",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 20",
            explicit: false,
            favourite: true,
        },
        {
            title: "Album 21",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 22",
            explicit: false,
            favourite: true,
        },
        {
            title: "Album 23",
            explicit: false,
            favourite: false,
        },
        {
            title: "Album 24",
            explicit: false,
            favourite: true,
        },

        {
            title: "Album 25",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 26",
            explicit: true,
            favourite: false,
        },
        {
            title: "Album 27",
            explicit: false,
            favourite: false,
        },
        {
            title: "Album 28",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 29",
            explicit: true,
            favourite: true,
        },
        {
            title: "Album 30",
            explicit: true,
            favourite: true,
        },
    ];

    const favouriteColor =
        theme.mode === "dark"
            ? "#cd3328"
            : "#e31515";

    return (
        <div
            style={{
                padding: "40px",
                paddingBottom: "220px",
            }}
        >
            {/* ---------- Your Albums ---------- */}
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
                    Your Albums
                </h2>

                {/* Scrollable Tiles */}
                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",

                        gap: 24,

                        paddingBottom: 8,
                    }}
                >
                    {albums.map(({ title, explicit, favourite }, index) => (
                        <div
                            key={index}
                            style={{
                                width: 300,

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

                                    aspectRatio: "1",

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

                                        top: 20,
                                        left: 20,

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

                            {/* title */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <div
                                    style={{
                                        color: theme.colors.text,
                                        ...theme.typography.body,
                                    }}
                                >
                                    {title}
                                </div>

                                {explicit && (
                                    <div
                                        style={{
                                            width: 14,
                                            height: 14,

                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",

                                            flexShrink: 0,

                                            borderRadius: 3,

                                            background:
                                                theme.mode === "dark"
                                                    ? "rgba(255,255,255,0.10)"
                                                    : "rgba(0,0,0,0.10)",

                                            color:
                                                theme.mode === "dark"
                                                    ? "#D6D6D2"
                                                    : "#4A4A47",

                                            fontSize: 8,
                                            fontWeight: 700,
                                            lineHeight: 1,

                                            userSelect: "none",
                                        }}
                                    >
                                        E
                                    </div>
                                )}

                                <Star
                                    size={13}
                                    strokeWidth={1.5}
                                    color={favouriteColor}
                                    fill={favourite ? favouriteColor : "none"}
                                />
                            </div>

                            {/* subtitle */}
                            <div
                                style={{
                                    color: theme.colors.textSecondary,

                                    ...theme.typography.smallText,
                                }}
                            >
                                Playlist
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}