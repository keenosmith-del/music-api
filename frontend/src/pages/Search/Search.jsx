import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useState, useEffect } from "react";

import { searchMusic } from "../../services/searchService";
import { getCategory } from "../../services/musicService";

import { getAlbum, getArtist } from "../../services/musicService";

import era70sImage from "../../assets/categories/70s.jpg";
import era80sImage from "../../assets/categories/80s.jpg";
import era2010sImage from "../../assets/categories/2010s.jpg";
import alternativeImage from "../../assets/categories/alternative.jpg";
import chartsImage from "../../assets/categories/charts.jpg";
import chillImage from "../../assets/categories/chill.jpg";
import concertImage from "../../assets/categories/concert.jpg";
import countryImage from "../../assets/categories/country.jpg";

import danceImage from "../../assets/categories/dance.jpg";
import essentialsImage from "../../assets/categories/essentials.jpg";
import feelGoodImage from "../../assets/categories/feelgood.jpg";
import focusImage from "../../assets/categories/focus.jpeg";
import gospelImage from "../../assets/categories/gospel.jpg";
import hipHopImage from "../../assets/categories/hiphop.jpg";
import hitsImage from "../../assets/categories/hits.jpg";
import jazzImage from "../../assets/categories/jazz.jpg";

import liveImage from "../../assets/categories/live.jpg";
import loveImage from "../../assets/categories/love.jpg";
import rapImage from "../../assets/categories/rap.jpeg";
import oldiesImage from "../../assets/categories/oldies.jpg";
import partyImage from "../../assets/categories/party.jpg";
import reggaeImage from "../../assets/categories/reggae.jpg";
import rnbImage from "../../assets/categories/rnb.jpeg";
import soulImage from "../../assets/categories/soul.jpg";
import rockImage from "../../assets/categories/rock.jpg";

import { useNavigate } from "react-router-dom";

import React from "react";

import {
    Play,
    Search as SearchIcon,
} from "lucide-react";

export default function Search() {
    const { theme } = useTheme();

    const navigate = useNavigate();

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

        setCurrentTrack,
        setAlbumQueue,

        setOriginalAlbumQueue,

        setCurrentTrackIndex,
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

                console.log(data.songs[0]);

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
            title: "Rock",
            query: "rock",
            artwork: rockImage,
        },
        {
            title: "Hits",
            query: "hits",
            artwork: hitsImage,
        },
        {
            title: "Concert",
            query: "concert",
            artwork: concertImage,
        },
        {
            title: "Chill",
            query: "chill",
            artwork: chillImage,
        },
        {
            title: "Charts",
            query: "charts",
            artwork: chartsImage,
        },
        {
            title: "Hip Hop",
            query: "hiphop",
            artwork: hipHopImage,
        },

        {
            title: "Live",
            query: "live",
            artwork: liveImage,
        },
        {
            title: "R&B",
            query: "rnb",
            artwork: rnbImage,
        },
        // {
        //     title: "Pop",
        //     query: "pop",
        //     artwork: popImage,
        // },
        {
            title: "Gospel",
            query: "gospel",
            artwork: gospelImage,
        },
        {
            title: "Dance",
            query: "dance",
            artwork: danceImage,
        },
        {
            title: "Alternative",
            query: "alternative",
            artwork: alternativeImage,
        },

        {
            title: "2010s",
            query: "2010s",
            artwork: era2010sImage,
        },
        {
            title: "'80s",
            query: "80s",
            artwork: era80sImage,
        },
        {
            title: "'70s",
            query: "70s",
            artwork: era70sImage,
        },
        {
            title: "Jazz",
            query: "jazz",
            artwork: jazzImage,
        },
        {
            title: "Country",
            query: "country",
            artwork: countryImage,
        },
        {
            title: "Essentials",
            query: "essentials",
            artwork: essentialsImage,
        },
        {
            title: "Focus",
            query: "focus",
            artwork: focusImage,
        },
        {
            title: "Feel Good",
            query: "feelgood",
            artwork: feelGoodImage,
        },

        {
            title: "Love",
            query: "love",
            artwork: loveImage,
        },
        {
            title: "Party",
            query: "party",
            artwork: partyImage,
        },
        {
            title: "Soul/Funk",
            query: "soulfunk",
            artwork: soulImage,
        },
        {
            title: "Oldies",
            query: "oldies",
            artwork: oldiesImage,
        },
        {
            title: "Reggae",
            query: "reggae",
            artwork: reggaeImage,
        },
        {
            title: "Rap",
            query: "rap",
            artwork: rapImage,
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
                                onClick={() => navigate(`/album/${song.albumId}`)}
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

                                        backgroundImage: song.artwork
                                            ? `url(${song.artwork})`
                                            : "none",

                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",

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

                                                setOriginalAlbumQueue(album.tracks);

                                                setAlbumQueue(album.tracks);

                                                setCurrentTrackIndex(trackIndex >= 0 ? trackIndex : 0);

                                                setCurrentTrack(
                                                    album.tracks[trackIndex >= 0 ? trackIndex : 0]
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
                                        />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        color: theme.colors.text,

                                        ...theme.typography.body,
                                    }}
                                >
                                    {song.title}
                                </div>

                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {song.artist}
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
                                onClick={() => navigate(`/album/${album.id}`)}
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

                                        backgroundImage: album.artwork
                                            ? `url(${album.artwork})`
                                            : "none",

                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",

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
                                                const albumData = await getAlbum(album.id);

                                                setOriginalAlbumQueue(albumData.tracks);

                                                setAlbumQueue(albumData.tracks);

                                                setCurrentTrackIndex(0);

                                                setCurrentTrack(albumData.tracks[0]);

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
                        Artists
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
                                onClick={() => navigate(`/artist/${artist.id}`)}
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

                                        backgroundImage: artist.artwork
                                            ? `url(${artist.artwork})`
                                            : "none",

                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",

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
                                                const tracks = await getArtist(artist.name);

                                                setOriginalAlbumQueue(tracks);

                                                setAlbumQueue(tracks);

                                                setCurrentTrackIndex(0);

                                                setCurrentTrack(tracks[0]);

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
                    {categories.map(({ title, query, artwork }, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/category/${query}`)}
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

                                    overflow: "hidden",

                                    backgroundImage: artwork ? `url(${artwork})` : "none",

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

                                    const overlay = e.currentTarget.querySelector(".tile-overlay");

                                    if (overlay) {
                                        overlay.style.background =
                                            theme.mode === "dark"
                                                ? "linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,.20))"
                                                : "linear-gradient(to top, rgba(255,255,255,.30), rgba(255,255,255,.12))";
                                    }
                                }}

                                onMouseLeave={(e) => {
                                    const play = e.currentTarget.querySelector(".tile-play-button");

                                    if (play) {
                                        play.style.opacity = "0";
                                        play.style.transform = "translateY(6px) scale(.92)";
                                    }

                                    const overlay = e.currentTarget.querySelector(".tile-overlay");

                                    if (overlay) {
                                        overlay.style.background =
                                            theme.mode === "dark"
                                                ? "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.08))"
                                                : "linear-gradient(to top, rgba(255,255,255,.15), rgba(255,255,255,.05))";
                                    }
                                }}
                            >
                                {/* overlay */}
                                <div
                                    className="tile-overlay"
                                    style={{
                                        position: "absolute",
                                        inset: 0,

                                        borderRadius: 26,

                                        background:
                                            theme.mode === "dark"
                                                ? "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.08))"
                                                : "linear-gradient(to top, rgba(255,255,255,.15), rgba(255,255,255,.05))",

                                        transition: "background 220ms ease",

                                        pointerEvents: "none",
                                    }}
                                />

                                {/* title */}
                                <div
                                    style={{
                                        position: "absolute",

                                        left: 20,
                                        bottom: 20,

                                        color: "#ECECE8",

                                        ...theme.typography.title,
                                    }}
                                >
                                    {title}
                                </div>

                                {/* play button */}
                                <div
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const tracks = await getCategory(query);

                                            if (!tracks.length) return;

                                            setOriginalAlbumQueue(tracks);

                                            setAlbumQueue(tracks);

                                            setCurrentTrackIndex(0);

                                            setCurrentTrack(tracks[0]);

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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}