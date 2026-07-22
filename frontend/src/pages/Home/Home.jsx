import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useEffect, useState } from "react";
import { getHome } from "../../services/homeService";
import { getAlbum } from "../../services/musicService";

import React from "react";

import musicIcon from "../../assets/svgs/music-thin.svg";

import { useNavigate } from "react-router-dom";

import {
    AudioLines,
    UserRound,
    Music,
    Play,
    Star,
} from "lucide-react";

export default function Home() {
    const { theme } = useTheme();

    const [homeSections, setHomeSections] = useState([]);

    const [favourites, setFavourites] = useState(new Set());

    const {
        signedIn,
        setSignedIn,

        homeCache,
        setHomeCache,

        setCurrentTime,
        setHasTrack,
        setIsPlaying,

        setCurrentTrack,
        setAlbumQueue,

        setOriginalAlbumQueue,

        setCurrentTrackIndex,

        favouriteColor,
    } = useApp();

    useEffect(() => {
        async function loadHome() {
            if (homeCache) {
                setHomeSections(homeCache);
                return;
            }

            const saved = localStorage.getItem("home-cache");

            if (saved) {
                const parsed = JSON.parse(saved);

                setHomeSections(parsed);
                setHomeCache(parsed);

                return;
            }

            try {
                const data = await getHome();

                setHomeSections(data);
                setHomeCache(data);

                localStorage.setItem(
                    "home-cache",
                    JSON.stringify(data)
                );
            } catch (err) {
                console.error(err);
            }
        }

        loadHome();
    }, [homeCache, setHomeCache]);

    const navigate = useNavigate();

    // star toggle handler
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

    const trendingAlbums =
        homeSections.find(
            section => section.id === "trending-albums"
        )?.items || [];

    const featuredPlaylists =
        homeSections.find(
            section => section.id === "featured-playlists"
        )?.items || [];

    const editorPicks =
        homeSections.find(
            section => section.id === "editor-picks"
        )?.items || [];

    const essentials =
        homeSections.find(
            section => section.id === "essentials"
        )?.items || [];

    const charts =
        homeSections.find(
            section => section.id === "charts"
        )?.items || [];

    const promotedReleases =
        homeSections.find(
            section => section.id === "promoted-releases"
        )?.items || [];

    const hipHop =
        homeSections.find(
            section => section.id === "hip-hop"
        )?.items || [];

    const rnb =
        homeSections.find(
            section => section.id === "rnb"
        )?.items || [];

    const chill =
        homeSections.find(
            section => section.id === "chill"
        )?.items || [];

    const pop =
        homeSections.find(
            section => section.id === "pop"
        )?.items || [];

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

                {/* ---------- Trending albums ---------- */}
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
                        Trending Albums
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
                        {trendingAlbums.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setOriginalAlbumQueue(album.tracks);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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
                                                flex: 1,
                                                minWidth: 0,

                                                color: theme.colors.text,

                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",

                                                ...theme.typography.body,
                                            }}
                                            title={title}
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

                {/* ---------- Featured Playlists ---------- */}
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
                        Featured Playlists
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
                        {featuredPlaylists.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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

                {/* ---------- Essentials ---------- */}
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
                        Essentials
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
                        {essentials.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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

                {/* ---------- Charts ---------- */}
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
                        Charts
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
                        {charts.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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

                {/* ---------- Editor's Picks ---------- */}
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
                        Editor's Picks
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
                        {editorPicks.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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

                {/* ---------- Promoted Releases ---------- */}
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
                        Promoted Releases
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
                        {promotedReleases.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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

                {/* ---------- Hip Hop ---------- */}
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
                        Hip Hop
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
                        {hipHop.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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

                {/* ---------- R&B ---------- */}
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
                        R&B
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
                        {rnb.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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

                {/* ---------- Chill ---------- */}
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
                        Chill
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
                        {chill.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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

                {/* ---------- Pop ---------- */}
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
                        Pop
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
                        {pop.map(
                            (
                                {
                                    id,
                                    title,
                                    artist,
                                    artwork,
                                    explicit,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/album/${id}`)}
                                    style={{
                                        width: 320, // width of tile
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

                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(31,31,31,.08)"
                                                    : "rgba(255,255,255,.55)",

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
                                                    const album = await getAlbum(id);

                                                    setAlbumQueue(album.tracks);

                                                    setCurrentTrackIndex(0);

                                                    setCurrentTrack(album.tracks[0]);

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

                {/*
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
                */}

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