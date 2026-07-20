import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";
import {
    getPodcasts,
    getPodcast,
} from "../../services/podcastService";

import React, { useEffect, useState } from "react";

import {
    Play,
} from "lucide-react";

export default function Podcasts() {
    const { theme } = useTheme();

    const {
        signedIn,
        setSignedIn,

        podcastsCache,
        setPodcastsCache,

        setCurrentTime,
        setHasTrack,
        setIsPlaying,

        setCurrentTrack,
        setAlbumQueue,
        setOriginalAlbumQueue,
        setCurrentTrackIndex,
    } = useApp();

    const [podcasts, setPodcasts] = useState({
        psychology: [],
        sleep: [],
        trueCrime: [],
        technology: [],
        business: [],
    });

    useEffect(() => {
        async function loadPodcasts() {
            if (podcastsCache) {
                setPodcasts(podcastsCache);
                return;
            }

            const saved = localStorage.getItem("podcasts-cache");

            if (saved) {
                const parsed = JSON.parse(saved);

                setPodcasts(parsed);
                setPodcastsCache(parsed);

                return;
            }

            try {
                const data = await getPodcasts();

                setPodcasts(data);
                setPodcastsCache(data);

                localStorage.setItem(
                    "podcasts-cache",
                    JSON.stringify(data)
                );
            } catch (err) {
                console.error(err);
            }
        }

        loadPodcasts();
    }, [podcastsCache, setPodcastsCache]);

    return (
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
                Podcasts
            </h1>

            {/* ---------- Psychology ---------- */}
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
                    Psychology
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
                    {podcasts.psychology.map(({ id, title, artist, artwork, explicit, feedUrl }, index) => (
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

                                    overflow: "hidden",

                                    backgroundImage: artwork
                                        ? `url(${artwork})`
                                        : "none",

                                    backgroundSize: "cover",

                                    backgroundPosition: "center",

                                    backgroundRepeat: "no-repeat",

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
                                {/* Logo */}
                                <div
                                    style={{
                                        position: "absolute",

                                        top: 20,
                                        right: 25,

                                        color: theme.colors.text,

                                        ...theme.typography.title,
                                    }}
                                >
                                </div>

                                {/* overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,

                                        borderRadius: 26,

                                        background:
                                            theme.mode === "dark"
                                                ? "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.08))"
                                                : "linear-gradient(to top, rgba(255,255,255,.15), rgba(255,255,255,.05))",

                                        pointerEvents: "none",
                                    }}
                                />

                                {/* play button */}
                                <div
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const podcast = await getPodcast(feedUrl);

                                            setOriginalAlbumQueue(podcast.tracks);

                                            setAlbumQueue(podcast.tracks);

                                            setCurrentTrackIndex(0);

                                            setCurrentTrack(podcast.tracks[0]);

                                            setCurrentTime(0);

                                            setHasTrack(true);

                                            setIsPlaying(true);
                                        } catch (err) {
                                            console.error(err);
                                        }
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
                                                : "rgba(255, 255, 255, 0.07)",

                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 8px 18px rgba(0,0,0,.35)"
                                                : "0 8px 18px rgba(0, 0, 0, 0.35)",
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

            {/* ---------- Sleep ---------- */}
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
                    Sleep
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
                    {podcasts.sleep.map(({ id, title, artist, artwork, explicit, feedUrl }, index) => (
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

                                    backgroundImage: artwork
                                        ? `url(${artwork})`
                                        : "none",

                                    backgroundSize: "cover",

                                    backgroundPosition: "center",

                                    backgroundRepeat: "no-repeat",

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
                                {/* Logo */}
                                <div
                                    style={{
                                        position: "absolute",

                                        top: 20,
                                        right: 25,

                                        color: theme.colors.text,

                                        ...theme.typography.title,
                                    }}
                                >
                                </div>

                                {/* overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,

                                        borderRadius: 26,

                                        background:
                                            theme.mode === "dark"
                                                ? "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.08))"
                                                : "linear-gradient(to top, rgba(255,255,255,.15), rgba(255,255,255,.05))",

                                        pointerEvents: "none",
                                    }}
                                />

                                {/* play button */}
                                <div
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const podcast = await getPodcast(feedUrl);

                                            setOriginalAlbumQueue(podcast.tracks);

                                            setAlbumQueue(podcast.tracks);

                                            setCurrentTrackIndex(0);

                                            setCurrentTrack(podcast.tracks[0]);

                                            setCurrentTime(0);

                                            setHasTrack(true);

                                            setIsPlaying(true);
                                        } catch (err) {
                                            console.error(err);
                                        }
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
                                                : "rgba(255, 255, 255, 0.07)",

                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 8px 18px rgba(0,0,0,.35)"
                                                : "0 8px 18px rgba(0, 0, 0, 0.35)",
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

            {/* ---------- True Crime ---------- */}
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
                    True Crime
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
                    {podcasts.trueCrime.map(({ id, title, artist, artwork, explicit, feedUrl }, index) => (
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

                                    backgroundImage: artwork
                                        ? `url(${artwork})`
                                        : "none",

                                    backgroundSize: "cover",

                                    backgroundPosition: "center",

                                    backgroundRepeat: "no-repeat",

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
                                {/* overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,

                                        borderRadius: 26,

                                        background:
                                            theme.mode === "dark"
                                                ? "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.08))"
                                                : "linear-gradient(to top, rgba(255,255,255,.15), rgba(255,255,255,.05))",

                                        pointerEvents: "none",
                                    }}
                                />

                                {/* play button */}
                                <div
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const podcast = await getPodcast(feedUrl);

                                            setOriginalAlbumQueue(podcast.tracks);

                                            setAlbumQueue(podcast.tracks);

                                            setCurrentTrackIndex(0);

                                            setCurrentTrack(podcast.tracks[0]);

                                            setCurrentTime(0);

                                            setHasTrack(true);

                                            setIsPlaying(true);
                                        } catch (err) {
                                            console.error(err);
                                        }
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
                                                : "rgba(255, 255, 255, 0.07)",

                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 8px 18px rgba(0,0,0,.35)"
                                                : "0 8px 18px rgba(0, 0, 0, 0.35)",
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

            {/* ---------- Technology ---------- */}
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
                    Technology
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
                    {podcasts.technology.map(({ id, title, artist, artwork, explicit, feedUrl }, index) => (
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

                                    backgroundImage: artwork
                                        ? `url(${artwork})`
                                        : "none",

                                    backgroundSize: "cover",

                                    backgroundPosition: "center",

                                    backgroundRepeat: "no-repeat",

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
                                {/* Logo */}
                                <div
                                    style={{
                                        position: "absolute",

                                        top: 20,
                                        right: 25,

                                        color: theme.colors.text,

                                        ...theme.typography.title,
                                    }}
                                >
                                </div>

                                {/* overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,

                                        borderRadius: 26,

                                        background:
                                            theme.mode === "dark"
                                                ? "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.08))"
                                                : "linear-gradient(to top, rgba(255,255,255,.15), rgba(255,255,255,.05))",

                                        pointerEvents: "none",
                                    }}
                                />

                                {/* play button */}
                                <div
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const podcast = await getPodcast(feedUrl);

                                            setOriginalAlbumQueue(podcast.tracks);

                                            setAlbumQueue(podcast.tracks);

                                            setCurrentTrackIndex(0);

                                            setCurrentTrack(podcast.tracks[0]);

                                            setCurrentTime(0);

                                            setHasTrack(true);

                                            setIsPlaying(true);
                                        } catch (err) {
                                            console.error(err);
                                        }
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
                                                : "rgba(255, 255, 255, 0.07)",

                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 8px 18px rgba(0,0,0,.35)"
                                                : "0 8px 18px rgba(0, 0, 0, 0.35)",
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

            {/* ---------- Business ---------- */}
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
                    Business
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
                    {podcasts.business.map(({ id, title, artist, artwork, explicit, feedUrl }, index) => (
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

                                    backgroundImage: artwork
                                        ? `url(${artwork})`
                                        : "none",

                                    backgroundSize: "cover",

                                    backgroundPosition: "center",

                                    backgroundRepeat: "no-repeat",

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
                                {/* Logo */}
                                <div
                                    style={{
                                        position: "absolute",

                                        top: 20,
                                        right: 25,

                                        color: theme.colors.text,

                                        ...theme.typography.title,
                                    }}
                                >
                                </div>

                                {/* overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,

                                        borderRadius: 26,

                                        background:
                                            theme.mode === "dark"
                                                ? "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.08))"
                                                : "linear-gradient(to top, rgba(255,255,255,.15), rgba(255,255,255,.05))",

                                        pointerEvents: "none",
                                    }}
                                />

                                {/* play button */}
                                <div
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const podcast = await getPodcast(feedUrl);

                                            setOriginalAlbumQueue(podcast.tracks);

                                            setAlbumQueue(podcast.tracks);

                                            setCurrentTrackIndex(0);

                                            setCurrentTrack(podcast.tracks[0]);

                                            setCurrentTime(0);

                                            setHasTrack(true);

                                            setIsPlaying(true);
                                        } catch (err) {
                                            console.error(err);
                                        }
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
                                                : "rgba(255, 255, 255, 0.07)",

                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 8px 18px rgba(0,0,0,.35)"
                                                : "0 8px 18px rgba(0, 0, 0, 0.35)",
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