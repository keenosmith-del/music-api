import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useState, useEffect } from "react";

import { searchMusic } from "../../services/searchService";

import React from "react";

import {
    Play,
    Search as SearchIcon,
} from "lucide-react";

export default function Search() {
    const { theme } = useTheme();

    const [search, setSearch] = useState("");

    const [results, setResults] = useState({
        artists: [],
        albums: [],
        songs: [],
    });

    const [searching, setSearching] = useState(false);

    const {
        setCurrentTime,
        setHasTrack,
        setIsPlaying,
    } = useApp();

    // search effect
    useEffect(() => {
        const query = search.trim();

        if (!query) {
            setResults({
                artists: [],
                albums: [],
                songs: [],
            });

            return;
        }

        const timeout = setTimeout(async () => {
            try {
                setSearching(true);

                const data = await searchMusic(query);

                console.log("Searching:", query);

                setResults(data);

                console.log(data);

            } catch (err) {
                console.error(err);
            } finally {
                setSearching(false);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    // search results
    const hasSearch = search.trim().length > 0;

    const hasSongs = results.songs.length > 0;

    const hasAlbums = results.albums.length > 0;

    const hasArtists = results.artists.length > 0;

    const hasAnyResults =
        hasSongs ||
        hasAlbums ||
        hasArtists;

    const showEmptyState =
        hasSearch &&
        !searching &&
        !hasAnyResults;

    // search helper
    const hasResults =
        results.artists.length ||
        results.albums.length ||
        results.songs.length;

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
            {/* ---------- Search bar ---------- */}
            <div
                style={{
                    marginBottom: 42,
                }}
            >
                <div
                    style={{
                        position: "relative",

                        width: "100%",
                        maxWidth: 620,
                        margin: "0 auto",
                    }}
                >
                    <SearchIcon
                        size={16}
                        strokeWidth={1.5}
                        color={theme.colors.textSecondary}
                        style={{
                            position: "absolute",
                            left: 22,
                            top: "50%",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                            zIndex: 2,
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Search music, artists, albums..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: "100%",
                            height: 48,

                            paddingLeft: 56,
                            paddingRight: 22,

                            border: "none",
                            outline: "none",

                            borderRadius: 999,

                            color: theme.colors.text,

                            background:
                                theme.mode === "dark"
                                    ? "rgba(38, 38, 38, 0.05)"
                                    : "rgba(255,255,255,0.60)",

                            backdropFilter: "blur(18px)",
                            WebkitBackdropFilter: "blur(18px)",

                            boxShadow:
                                theme.mode === "dark"
                                    ? "0 10px 24px rgba(0,0,0,.28)"
                                    : `
                            0 10px 24px rgba(0,0,0,.08),
                            inset 0 1px 0 rgba(255,255,255,.9)
                        `,

                            ...theme.typography.body,
                        }}
                    />
                </div>
            </div>

            {/* song results */}
            {hasSongs && (
                <div
                    style={{
                        marginBottom: 54,
                    }}
                >
                    <h2
                        style={{
                            color: theme.colors.text,

                            marginBottom: 18,

                            ...theme.typography.rowHeading,
                        }}
                    >
                        Song Results
                    </h2>

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
                        {results.songs.map((song, index) => (
                            <div
                                key={song.id}
                                style={{
                                    width: 220,
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
                                    <div
                                        style={{
                                            position: "absolute",

                                            top: 100,
                                            left: 20,

                                            color: theme.colors.text,

                                            ...theme.typography.title,
                                        }}
                                    >
                                        {song.title}
                                    </div>

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
                                        />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        color: theme.colors.text,

                                        ...theme.typography.body,
                                    }}
                                >
                                    {song.artist}
                                </div>

                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {song.album}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* album results */}
            {hasAlbums && (
                <div
                    style={{
                        marginBottom: 54,
                    }}
                >
                    <h2
                        style={{
                            color: theme.colors.text,

                            marginBottom: 18,

                            ...theme.typography.rowHeading,
                        }}
                    >
                        Album Results
                    </h2>

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
                        {results.albums.map((album, index) => (
                            <div
                                key={album.id}
                                style={{
                                    width: 220,
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
                                        />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        color: theme.colors.text,

                                        ...theme.typography.body,
                                    }}
                                >
                                    {album.title}
                                </div>

                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {album.artist}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* artist results */}
            {hasArtists && (
                <div
                    style={{
                        marginBottom: 54,
                    }}
                >
                    <h2
                        style={{
                            color: theme.colors.text,

                            marginBottom: 18,

                            ...theme.typography.rowHeading,
                        }}
                    >
                        Artist Results
                    </h2>

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
                        {results.artists.map((artist, index) => (
                            <div
                                key={artist.id}
                                style={{
                                    width: 220,
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
                                        />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        color: theme.colors.text,

                                        ...theme.typography.body,
                                    }}
                                >
                                    {artist.name}
                                    {/* I want artist name */}
                                    {/* this is still returning "The white album" if "white album is seaarched. IT NEEDS ONLY ARTISTS WITH "WHITE ALBUM" KEYWORD IN THEIR NAME */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showEmptyState && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",

                        alignItems: "center",
                        justifyContent: "center",

                        gap: 18,

                        padding: "90px 20px",

                        textAlign: "center",
                    }}
                >
                    <SearchIcon
                        size={42}
                        strokeWidth={1.25}
                        color={theme.colors.textSecondary}
                    />

                    <div
                        style={{
                            color: theme.colors.text,

                            ...theme.typography.title,
                        }}
                    >
                        No Results Found
                    </div>

                    <div
                        style={{
                            color: theme.colors.textSecondary,

                            maxWidth: 320,

                            ...theme.typography.body,
                        }}
                    >
                        Try searching for a different song, artist or album.
                    </div>
                </div>
            )}

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

                {/* Non-scrollable Tiles */}
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