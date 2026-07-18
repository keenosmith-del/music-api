import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useState } from "react";

import React from "react";

import {
    Play,
    Star,
    Ellipsis,
    Plus,
} from "lucide-react";

export default function Songs() {
    const { theme } = useTheme();

    const {
        setCurrentTime,
        setHasTrack,
        setIsPlaying,
    } = useApp();

    const newSongs = [
        {
            title: "1",
            explicit: true,
            favourite: true,
        },
        {
            title: "2",
            explicit: true,
            favourite: true,
        },
        {
            title: "3",
            explicit: true,
            favourite: false,
        },

        {
            title: "4",
            explicit: false,
            favourite: false,
        },
        {
            title: "5",
            explicit: false,
            favourite: true,
        },
        {
            title: "6",
            explicit: false,
            favourite: true,
        },

        {
            title: "7",
            explicit: true,
            favourite: true,
        },
        {
            title: "8",
            explicit: true,
            favourite: true,
        },
        {
            title: "9",
            explicit: true,
            favourite: false,
        },

        {
            title: "10",
            explicit: false,
            favourite: false,
        },
        {
            title: "11",
            explicit: false,
            favourite: true,
        },
        {
            title: "12",
            explicit: false,
            favourite: true,
        },

        {
            title: "13",
            explicit: false,
            favourite: false,
        },
        {
            title: "14",
            explicit: false,
            favourite: true,
        },
        {
            title: "15",
            explicit: false,
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

            {/* ---------- New Songs ---------- */}
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
                    Your Songs
                </h2>

                {/* Column */}
                <div
                    style={{
                        display: "flex",
                        gap: 36,

                        overflowX: "auto",
                        overflowY: "hidden",

                        paddingLeft: 20,
                        paddingBottom: 8,

                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {/* row  */}
                    <div
                        style={{
                            width: 430,
                            flexShrink: 0,

                            display: "flex",
                            flexDirection: "column",

                            gap: 24,
                        }}
                    >
                        {newSongs.map(({ title, explicit, favourite }, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",

                                    gap: 18,

                                    cursor: "pointer",
                                }}
                            >
                                {/* Artwork */}
                                <div
                                    style={{
                                        position: "relative",

                                        width: 90,
                                        height: 90,

                                        flexShrink: 0,

                                        borderRadius: 24,

                                        overflow: "hidden",

                                        background:
                                            theme.mode === "dark"
                                                ? index % 2 === 0
                                                    ? "rgba(31,31,31,.05)"
                                                    : "rgba(29,29,29,.08)"
                                                : index % 2 === 0
                                                    ? "rgba(255,255,255,.45)"
                                                    : "rgba(255,255,255,.70)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 12px 28px rgba(0,0,0,.30)"
                                                : `
                                                0 12px 28px rgba(0,0,0,.08),
                                                inset 0 1px 0 rgba(255,255,255,.95)
                                              `,
                                    }}
                                    onMouseEnter={(e) => {
                                        const play =
                                            e.currentTarget.querySelector(".tile-play-button");

                                        if (play) {
                                            play.style.opacity = "1";
                                            play.style.transform =
                                                "translate(-50%, -50%) scale(1)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        const play =
                                            e.currentTarget.querySelector(".tile-play-button");

                                        if (play) {
                                            play.style.opacity = "0";
                                            play.style.transform =
                                                "translate(-50%, -50%) scale(.92)";
                                        }
                                    }}
                                >
                                    {/* Play Button */}
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            setCurrentTime(0);
                                            setHasTrack(true);
                                            setIsPlaying(true);
                                        }}
                                        className="tile-play-button"
                                        style={{
                                            position: "absolute",

                                            left: "50%",
                                            top: "50%",

                                            width: 42,
                                            height: 42,

                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",

                                            borderRadius: "50%",

                                            opacity: 0,

                                            transform:
                                                "translate(-50%, -50%) scale(.92)",

                                            transition: "all 220ms ease",

                                            background:
                                                theme.mode === "dark"
                                                    ? "rgba(13,13,13,.08)"
                                                    : "rgba(255,255,255,.28)",

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

                                {/* Song Info */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",

                                        justifyContent: "center",

                                        minWidth: 0,

                                        gap: 6,

                                        flex: 1,
                                    }}
                                >
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

                                                    borderRadius: 3,

                                                    background:
                                                        theme.mode === "dark"
                                                            ? "rgba(255,255,255,.10)"
                                                            : "rgba(0,0,0,.10)",

                                                    color:
                                                        theme.mode === "dark"
                                                            ? "#D6D6D2"
                                                            : "#4A4A47",

                                                    fontSize: 8,
                                                    fontWeight: 700,
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

                                    <div
                                        style={{
                                            color: theme.colors.textSecondary,

                                            ...theme.typography.smallText,
                                        }}
                                    >
                                        Playlist
                                    </div>
                                </div>

                                <div
                                    style={{
                                        marginLeft: "auto",

                                        display: "flex-end",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        width: 24,
                                        height: 24,

                                        cursor: "pointer",

                                        color: theme.colors.textSecondary,

                                        transition: "all 180ms ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    <Plus
                                        size={18}
                                        color={favouriteColor}
                                        strokeWidth={1.6}
                                    />
                                </div>

                                <div
                                    style={{
                                        marginLeft: "auto",

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        width: 24,
                                        height: 24,

                                        cursor: "pointer",

                                        color: theme.colors.textSecondary,

                                        transition: "all 180ms ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                        e.currentTarget.style.color = theme.colors.text;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.color = theme.colors.textSecondary;
                                    }}
                                >
                                    <Ellipsis
                                        size={18}
                                        strokeWidth={1.6}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> {/* end new songs row */}

        </div>

    )
}