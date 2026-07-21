import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useEffect, useState } from "react";
import { getNew } from "../../services/newService";
import { getAlbum } from "../../services/musicService";
import { useNavigate } from "react-router-dom";

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
        signedIn,
        setSignedIn,

        newCache,
        setNewCache,

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
        async function loadNew() {
            if (newCache) {
                setNewData(newCache);
                return;
            }

            const saved = localStorage.getItem("new-cache");

            if (saved) {
                const parsed = JSON.parse(saved);

                setNewData(parsed);
                setNewCache(parsed);

                return;
            }

            try {
                const data = await getNew();

                setNewData(data);
                setNewCache(data);

                localStorage.setItem(
                    "new-cache",
                    JSON.stringify(data)
                );
            } catch (err) {
                console.error(err);
            }
        }

        loadNew();
    }, [newCache, setNewCache]);

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

    const navigate = useNavigate();

    const newAlbums =
        newData?.newAlbums || [];

    const newSongs =
        newData?.newSongs || [];

    const newThisWeek =
        newData?.newThisWeek || [];

    const recentReleases =
        newData?.recentReleases || [];

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
                            onClick={() => navigate(`/album/${id}`)}
                            style={{
                                width: 280,
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
                    {newSongs.map(({ id, albumId, title, artist, artwork, explicit }, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/album/${albumId}`)}
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
                                            const album = await getAlbum(song.albumId);

                                            const trackIndex = album.tracks.findIndex(
                                                (track) => track.id === song.id
                                            );

                                            const startIndex =
                                                trackIndex >= 0 ? trackIndex : 0;

                                            setOriginalAlbumQueue(album.tracks);

                                            setAlbumQueue(album.tracks);

                                            setCurrentTrackIndex(startIndex);

                                            setCurrentTrack(
                                                album.tracks[startIndex]
                                            );

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
            </div> {/* end new songs */}

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
                            onClick={() => navigate(`/album/${id}`)}
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
                            onClick={() => navigate(`/album/${id}`)}
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