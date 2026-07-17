import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useState } from "react";

import React from "react";

import musicIcon from "../../assets/svgs/music-thin.svg";

import {
    AudioLines,
    UserRound,
    Music,
    Play,
    Star,
} from "lucide-react";

export default function Home() {
    const { theme } = useTheme();

    const {
        signedIn,
        setSignedIn,

        setCurrentTime,
        setHasTrack,
        setIsPlaying,

        favouriteColor,
    } = useApp();

    const topPicks = [
        {
            title: "Top Pick 1",
            explicit: false,
            favourite: true,
        },
        {
            title: "Top Pick 2",
            explicit: true,
            favourite: false,
        },
        {
            title: "Top Pick 3",
            explicit: false,
            favourite: true,
        },
        {
            title: "Top Pick 4",
            explicit: false,
            favourite: false,
        },
        {
            title: "Top Pick 5",
            explicit: true,
            favourite: false,
        },
        {
            title: "Top Pick 6",
            explicit: false,
            favourite: true,
        },
    ];

    const recentlyPlayed = [
        {
            title: "Recently Played 1",
            explicit: true,
            favourite: true,
        },
        {
            title: "Recently Played 2",
            explicit: true,
            favourite: false,
        },
        {
            title: "Recently Played 3",
            explicit: false,
            favourite: false,
        },
        {
            title: "Recently Played 4",
            explicit: true,
            favourite: false,
        },
        {
            title: "Recently Played 5",
            explicit: false,
            favourite: true,
        },
        {
            title: "Recently Played 6",
            explicit: true,
            favourite: true,
        },
    ];

    return (

        signedIn ? (
            <div
                style={{
                    padding: "40px",
                    paddingBottom: "220px",
                }}
            >
                {/* Page Heading */}
                <h1
                    style={{
                        color: theme.colors.text,
                        marginBottom: 42,
                        ...theme.typography.display,
                    }}
                >
                    Home
                </h1>

                {/* ---------- Top Picks ---------- */}
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
                        Top Picks
                    </h2>

                    {/* Scrollable Tiles */}
                    <div
                        style={{
                            display: "flex",
                            gap: 24,

                            overflowX: "auto",
                            overflowY: "hidden",

                            paddingLeft: 20,
                            paddingBottom: 8,

                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {topPicks.map(({ title, explicit, favourite }, index) => (
                            <div
                                key={index}
                                style={{
                                    width: 300, // width of tile
                                    flexShrink: 0,

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

                {/* ---------- Recently Played ---------- */}
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
                        Recently Played
                    </h2>

                    {/* Scrollable Tiles */}
                    <div
                        style={{
                            display: "flex",
                            gap: 24,

                            overflowX: "auto",
                            overflowY: "hidden",

                            paddingLeft: 20,
                            paddingBottom: 8,

                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {recentlyPlayed.map(({ title, explicit, favourite }, index) => (
                            <div
                                key={index}
                                style={{
                                    width: 300,
                                    flexShrink: 0,

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

                                        overflow: "hidden",

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
                {/*<AudioLines size={90} strokeWidth={1} color={theme.colors.text} /> */}

                <img
                    src={musicIcon}
                    style={{
                        width: 200,
                        height: 200,

                        display: "block",

                        cursor: "default",

                        userSelect: "none",
                        WebkitUserDrag: "none",

                        transition: "transform 120ms ease",

                        // opacity: theme.mode === "dark" ? "0.55" : "0.85",

                        filter:
                            theme.mode === "dark"
                                ? "invert(1)"
                                : "invert(0)",
                    }}
                />

                {/* DISCRIPTION */}
                <div
                    style={{
                        width: 500,

                        maxWidth: "100%",

                        marginTop: 40,

                        color: theme.colors.textSecondary,

                        lineHeight: 1.7,

                        ...theme.typography.body,
                    }}
                >
                    Get playlists and albums inspired by the artists and genres you're listening to.
                    Click to sign in.
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

        )
    )

}