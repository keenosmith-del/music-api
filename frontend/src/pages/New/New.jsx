import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useEffect, useState } from "react";
import { getNew } from "../../services/newService";

import React from "react";

import {
    Play,
    Star,
    Ellipsis,
    Plus,
} from "lucide-react";

export default function New() {
    const { theme } = useTheme();

    const [newData, setNewData] = useState(null);

    const [favourites, setFavourites] = useState(new Set());

    const {
        setCurrentTime,
        setHasTrack,
        setIsPlaying,
    } = useApp();

    useEffect(() => {
        async function loadNew() {
            try {
                const data = await getNew();

                setNewData(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadNew();
    }, []);

    // toggle star handler
    const toggleFavourite = (id) => {
        setFavourites((prev) => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    };

    const newAlbums =
        newData?.newAlbums || [];

    const newSongs =
        newData?.newSongs || [];

    const newThisWeek =
        newData?.newThisWeek || [];

    const recentReleases =
        newData?.recentReleases || [];

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

            {/* ---------- New Albums ---------- */}
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
                    New Albums
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
                    {newAlbums.map(({ id, title, artist, artwork, explicit }, index) => (
                        <div
                            key={index}
                            style={{
                                width: 350,
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

                                    height: 200,

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
                                    fill={favourites.has(id) ? favouriteColor : "none"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavourite(id);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        transition: "all 180ms ease",
                                    }}
                                />
                            </div>

                            {/* subtitle */}
                            <div
                                style={{
                                    color: theme.colors.textSecondary,

                                    ...theme.typography.smallText,
                                }}
                            >
                                {artist}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                    New Songs
                </h2>

                {/* Scrollable Columns */}
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
                    {/* First Column */}
                    <div
                        style={{
                            width: 430,
                            flexShrink: 0,

                            display: "flex",
                            flexDirection: "column",

                            gap: 24,
                        }}
                    >
                        {newSongs.slice(0, 3).map(({ id, title, artist, artwork, explicit }, index) => (
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
                                            fill={favourites.has(id) ? favouriteColor : "none"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavourite(id);
                                            }}
                                            style={{
                                                cursor: "pointer",
                                                transition: "all 180ms ease",
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            color: theme.colors.textSecondary,

                                            ...theme.typography.smallText,
                                        }}
                                    >
                                        {artist}
                                    </div>
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

                    {/* Second Column */}
                    <div
                        style={{
                            width: 430,
                            flexShrink: 0,

                            display: "flex",
                            flexDirection: "column",

                            gap: 24,
                        }}
                    >
                        {newSongs.slice(3, 6).map(({ id, title, artist, artwork, explicit }, index) => (
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
                                            fill={favourites.has(id) ? favouriteColor : "none"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavourite(id);
                                            }}
                                            style={{
                                                cursor: "pointer",
                                                transition: "all 180ms ease",
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            color: theme.colors.textSecondary,

                                            ...theme.typography.smallText,
                                        }}
                                    >
                                        {artist}
                                    </div>
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

                    {/* Third Column */}
                    <div
                        style={{
                            width: 430,
                            flexShrink: 0,

                            display: "flex",
                            flexDirection: "column",

                            gap: 24,
                        }}
                    >
                        {newSongs.slice(6, 9).map(({ id, title, artist, artwork, explicit }, index) => (
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
                                            fill={favourites.has(id) ? favouriteColor : "none"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavourite(id);
                                            }}
                                            style={{
                                                cursor: "pointer",
                                                transition: "all 180ms ease",
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            color: theme.colors.textSecondary,

                                            ...theme.typography.smallText,
                                        }}
                                    >
                                        {artist}
                                    </div>
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

                    {/* Fourth Column */}
                    <div
                        style={{
                            width: 430,
                            flexShrink: 0,

                            display: "flex",
                            flexDirection: "column",

                            gap: 24,
                        }}
                    >
                        {newSongs.slice(9, 12).map(({ id, title, artist, artwork, explicit }, index) => (
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
                                            fill={favourites.has(id) ? favouriteColor : "none"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavourite(id);
                                            }}
                                            style={{
                                                cursor: "pointer",
                                                transition: "all 180ms ease",
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            color: theme.colors.textSecondary,

                                            ...theme.typography.smallText,
                                        }}
                                    >
                                        {artist}
                                    </div>
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

                    {/* Fifth Column */}
                    <div
                        style={{
                            width: 430,
                            flexShrink: 0,

                            display: "flex",
                            flexDirection: "column",

                            gap: 24,
                        }}
                    >
                        {newSongs.slice(12, 15).map(({ id, title, artist, artwork, explicit }, index) => (
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
                                            fill={favourites.has(id) ? favouriteColor : "none"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavourite(id);
                                            }}
                                            style={{
                                                cursor: "pointer",
                                                transition: "all 180ms ease",
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            color: theme.colors.textSecondary,

                                            ...theme.typography.smallText,
                                        }}
                                    >
                                        {artist}
                                    </div>
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

            {/* ---------- New This Week ---------- */}
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
                    New This Week
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
                    {newThisWeek.map(({ id, title, artist, artwork, explicit }, index) => (
                        <div
                            key={index}
                            style={{
                                width: 280, // width of tile
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
                                    fill={favourites.has(id) ? favouriteColor : "none"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavourite(id);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        transition: "all 180ms ease",
                                    }}
                                />
                            </div>

                            {/* subtitle */}
                            <div
                                style={{
                                    color: theme.colors.textSecondary,

                                    ...theme.typography.smallText,
                                }}
                            >
                                {artist}
                            </div>
                        </div>
                    ))}
                </div>
            </div> {/* end new this week */}

            {/* ---------- Recent Releases ---------- */}
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
                    Recent Releases
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
                    {recentReleases.map(({ id, title, artist, artwork, explicit }, index) => (
                        <div
                            key={index}
                            style={{
                                width: 280, // width of tile
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
                                    fill={favourites.has(id) ? favouriteColor : "none"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavourite(id);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        transition: "all 180ms ease",
                                    }}
                                />
                            </div>

                            {/* subtitle */}
                            <div
                                style={{
                                    color: theme.colors.textSecondary,

                                    ...theme.typography.smallText,
                                }}
                            >
                                {artist}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}