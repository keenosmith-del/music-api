import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAlbum } from "../../services/musicService";

import { useNavigate } from "react-router-dom";

import {
    Play,
    Pause,
    Shuffle,
    Star,
    Ellipsis,
    Plus,
    AudioLines,
} from "lucide-react";

export default function Album() {
    const { theme } = useTheme();

    const navigate = useNavigate();

    const { id } = useParams();

    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAlbum() {
            try {
                const data = await getAlbum(id);

                setAlbum(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadAlbum();
    }, [id]);

    const {
        albumCache,
        setAlbumCache,

        setCurrentTime,
        setHasTrack,
        setIsPlaying,

        setCurrentTrack,
        setAlbumQueue,

        shuffleOn,
        setShuffleOn,

        albumQueue,

        originalAlbumQueue,
        setOriginalAlbumQueue,

        setCurrentTrackIndex,

        currentTrack,
        isPlaying,
    } = useApp();

    useEffect(() => {
        async function loadAlbum() {
            if (albumCache[id]) {
                setAlbum(albumCache[id]);
                setLoading(false);
                return;
            }

            const saved = localStorage.getItem(`album-${id}`);

            if (saved) {
                const parsed = JSON.parse(saved);

                setAlbum(parsed);

                setAlbumCache((prev) => ({
                    ...prev,
                    [id]: parsed,
                }));

                setLoading(false);
                return;
            }

            try {
                const data = await getAlbum(id);

                setAlbum(data);

                setAlbumCache((prev) => ({
                    ...prev,
                    [id]: data,
                }));

                localStorage.setItem(
                    `album-${id}`,
                    JSON.stringify(data)
                );
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadAlbum();
    }, [id, albumCache, setAlbumCache]);

    const favouriteColor =
        theme.mode === "dark"
            ? "#cd3328"
            : "#e31515";

    const songs = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Song ${i + 1}`,
        artist: "Frank Ocean",
        duration: `${3 + (i % 3)}:${String(10 + i).padStart(2, "0")}`,
        explicit: i % 3 === 0,
        favourite: i % 2 === 0,
    }));

    const isCurrentTrack = (song) =>
        currentTrack?.id === song.id;

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "calc(100vh - 220px)",

                    display: "flex",
                    flexDirection: "column",

                    alignItems: "center",
                    justifyContent: "center",

                    gap: 20,
                }}
            >
                {/* Spinner */}
                <div
                    style={{
                        width: 20,
                        height: 20,

                        borderRadius: "50%",

                        border: `1px solid ${theme.mode === "dark"
                            ? "rgba(255,255,255,.10)"
                            : "rgba(0,0,0,.10)"
                            }`,

                        borderTopColor:
                            theme.mode === "dark"
                                ? "#ECECE8"
                                : "#1D1D1D",

                        animation: "albumSpinner .8s linear infinite",
                    }}
                />

                <div
                    style={{
                        color: theme.colors.text,

                        ...theme.typography.body,
                    }}
                >
                    Loading album...
                </div>

                <style>
                    {`
                    @keyframes albumSpinner {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}
                </style>
            </div>
        );
    }

    if (!album) {
        return (
            <div
                style={{
                    padding: "40px",
                    color: theme.colors.text,
                    ...theme.typography.body,
                }}
            >
                Unable to load album.
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "40px",
                paddingBottom: "220px",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    gap: 42,
                    alignItems: "flex-start",
                    marginBottom: 70,
                }}
            >
                {/* Artwork */}
                <div
                    style={{
                        position: "relative",

                        width: 340,
                        aspectRatio: "1",

                        flexShrink: 0,

                        borderRadius: 34,

                        overflow: "hidden",

                        background:
                            theme.mode === "dark"
                                ? "rgba(31,31,31,.08)"
                                : "rgba(255,255,255,.55)",

                        boxShadow:
                            theme.mode === "dark"
                                ? "0 12px 28px rgba(0,0,0,.30)"
                                : `
                    0 12px 28px rgba(0,0,0,.08),
                    inset 0 1px 0 rgba(255,255,255,.95)
                `,
                    }}
                >
                    {album.artwork && (
                        <img
                            src={album.artwork}
                            alt={album.title}
                            style={{
                                width: "100%",
                                height: "100%",

                                objectFit: "cover",

                                display: "block",
                            }}
                        />
                    )}
                </div>

                {/* Album Info */}
                <div
                    style={{
                        flex: 1,

                        display: "flex",
                        flexDirection: "column",

                        minWidth: 0,

                    }}
                >
                    {/* Title */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 12,
                        }}
                    >
                        <h1
                            style={{
                                margin: 0,
                                color: theme.colors.text,
                                ...theme.typography.display,
                            }}
                        >
                            {album.title}
                        </h1>

                        {album.explicit && (
                            <div
                                style={{
                                    width: 18,
                                    height: 18,

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    borderRadius: 4,

                                    background:
                                        theme.mode === "dark"
                                            ? "rgba(255,255,255,.10)"
                                            : "rgba(0,0,0,.10)",

                                    color:
                                        theme.mode === "dark"
                                            ? "#D6D6D2"
                                            : "#4A4A47",

                                    fontSize: 9,
                                    fontWeight: 700,
                                }}
                            >
                                E
                            </div>
                        )}

                        <Star
                            size={16}
                            strokeWidth={1.5}
                            color={favouriteColor}
                            fill={
                                album.favourite
                                    ? favouriteColor
                                    : "none"
                            }
                        />
                    </div>

                    {/* Artist */}
                    <div
                        onClick={() => navigate(`/artist/${album.artistId}`)}
                        style={{
                            color: theme.colors.text,
                            marginBottom: 8,

                            cursor: "pointer",
                            width: "fit-content",

                            ...theme.typography.body,
                        }}
                    >
                        {album.artist}
                    </div>

                    {/* Year */}
                    <div
                        style={{
                            color: theme.colors.textSecondary,
                            marginBottom: 26,
                            ...theme.typography.smallText,
                        }}
                    >
                        {album.year}
                    </div>

                    {/* Description */}
                    <div
                        style={{
                            maxWidth: 620,

                            color: theme.colors.textSecondary,

                            lineHeight: 1.7,

                            minHeight: 130, // Reserve space even when there's no description

                            marginBottom: 42,

                            ...theme.typography.smallText,
                        }}
                    >
                        {album.description}
                    </div>

                    {/* Buttons */}
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                        }}
                    >
                        {/* Play */}
                        <button
                            onClick={() => {
                                if (!album?.tracks?.length) return;

                                setOriginalAlbumQueue(album.tracks);

                                setAlbumQueue(album.tracks);

                                setCurrentTrackIndex(0);

                                setCurrentTrack(album.tracks[0]);

                                setCurrentTime(0);

                                setHasTrack(true);

                                setIsPlaying(true);
                            }}
                            style={{
                                width: 180,
                                height: 38,

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
                                        ? "#cd3328"
                                        : "#e31515",

                                color:
                                    theme.mode === "dark"
                                        ? theme.colors.text
                                        : "#ecece8",

                                boxShadow:
                                    theme.mode === "dark"
                                        ? "0 6px 18px rgba(0,0,0,.22)"
                                        : "0 1px 2px rgba(0,0,0,.05)",

                                transition: "all 220ms ease",

                                ...theme.typography.buttonSecondary,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            <Play
                                size={16}
                                strokeWidth={1}
                                fill="#ECECE8"
                            />

                            <span>Play</span>
                        </button>

                        {/* Shuffle */}
                        <button
                            onClick={() => {
                                const shuffled = [...originalAlbumQueue];

                                for (let i = shuffled.length - 1; i > 0; i--) {
                                    const j = Math.floor(Math.random() * (i + 1));

                                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                                }

                                setShuffleOn(true);

                                setAlbumQueue(shuffled);

                                setCurrentTrackIndex(0);

                                setCurrentTrack(shuffled[0]);

                                setCurrentTime(0);

                                setIsPlaying(true);
                            }}
                            style={{
                                width: 180,
                                height: 38,

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
                                        ? "rgba(50,50,50,.08)"
                                        : "rgba(255,255,255,.08)",

                                color: theme.colors.text,

                                boxShadow:
                                    theme.mode === "dark"
                                        ? "0 6px 18px rgba(0,0,0,.22)"
                                        : "0 1px 2px rgba(0,0,0,.05)",

                                transition: "all 220ms ease",

                                ...theme.typography.buttonSecondary,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            <Shuffle
                                size={16}
                                strokeWidth={1}
                            />

                            <span>Shuffle</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Songs Header */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "60px minmax(0,1fr) 220px 80px 36px 36px",

                    alignItems: "center",

                    padding: "0 18px 18px",

                    color: theme.colors.textSecondary,

                    ...theme.typography.smallText,
                }}
            >
                <div>#</div>
                <div>Title</div>
                <div>Artist</div>
                <div>Time</div>
                <div />
                <div />
            </div>

            {/* Songs */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                {album.tracks.map((song, index) => (
                    <div
                        key={song.id}
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "60px minmax(0,1fr) 220px 80px 36px 36px",

                            alignItems: "center",

                            minHeight: 54,

                            padding: "0 18px",

                            borderRadius: 18,

                            transition: "background 180ms ease",

                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                theme.mode === "dark"
                                    ? "rgba(255,255,255,.04)"
                                    : "rgba(0,0,0,.035)";

                            const play =
                                e.currentTarget.querySelector(".track-play");

                            const number =
                                e.currentTarget.querySelector(".track-number");

                            const audio =
                                e.currentTarget.querySelector(".track-audio");

                            if (play) play.style.opacity = "1";
                            if (number) number.style.opacity = "0";
                            if (audio) audio.style.opacity = "0";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";

                            const play = e.currentTarget.querySelector(".track-play");
                            const number = e.currentTarget.querySelector(".track-number");
                            const audio = e.currentTarget.querySelector(".track-audio");

                            if (play) play.style.opacity = "0";

                            if (audio) {
                                audio.style.opacity = "1";
                            } else if (number) {
                                number.style.opacity = "1";
                            }
                        }}
                    >
                        {/* Number / Play */}
                        <div
                            onClick={(e) => {
                                e.stopPropagation();

                                if (isCurrentTrack(song)) {
                                    setIsPlaying((playing) => !playing);
                                    return;
                                }

                                setOriginalAlbumQueue(album.tracks);

                                setAlbumQueue(album.tracks);

                                setCurrentTrackIndex(index);

                                setCurrentTrack(song);

                                setCurrentTime(0);

                                setHasTrack(true);

                                setIsPlaying(true);
                            }}
                            style={{
                                position: "relative",

                                width: 24,
                                height: 24,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {!isCurrentTrack(song) && (
                                <div
                                    className="track-number"
                                    style={{
                                        position: "absolute",

                                        color: theme.colors.textSecondary,

                                        transition: "opacity 180ms ease",

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {index + 1}
                                </div>
                            )}

                            {isCurrentTrack(song) && isPlaying && (
                                <div
                                    className="track-audio"
                                    style={{
                                        position: "absolute",

                                        display: "flex",
                                        alignItems: "flex-end",
                                        justifyContent: "center",

                                        gap: 2,

                                        width: 16,
                                        height: 16,

                                        opacity: 1,

                                        transition: "opacity 180ms ease",
                                    }}
                                >
                                    <span className="audio-bar bar1" />
                                    <span className="audio-bar bar2" />
                                    <span className="audio-bar bar3" />
                                </div>
                            )}

                            {isCurrentTrack(song) && !isPlaying && (
                                <div
                                    className="track-number"
                                    style={{
                                        position: "absolute",

                                        color: theme.colors.textSecondary,

                                        transition: "opacity 180ms ease",

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {index + 1}
                                </div>
                            )}

                            {isCurrentTrack(song) && isPlaying ? (
                                <Pause
                                    className="track-play"
                                    size={15}
                                    strokeWidth={1.6}
                                    fill={theme.colors.text}
                                    color={theme.colors.text}
                                    style={{
                                        position: "absolute",

                                        opacity: 0,

                                        transition: "opacity 180ms ease",
                                    }}
                                />
                            ) : (
                                <Play
                                    className="track-play"
                                    size={15}
                                    strokeWidth={1.6}
                                    fill={theme.colors.text}
                                    color={theme.colors.text}
                                    style={{
                                        position: "absolute",

                                        opacity: 0,

                                        transition: "opacity 180ms ease",

                                        marginLeft: 2,
                                    }}
                                />
                            )}
                        </div>

                        {/* Title */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",

                                gap: 8,

                                minWidth: 0,
                            }}
                        >
                            <div
                                style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",

                                    color: theme.colors.text,

                                    ...theme.typography.body,
                                }}
                            >
                                {song.title}
                            </div>

                            {song.explicit && (
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
                                fill={
                                    song.favourite
                                        ? favouriteColor
                                        : "none"
                                }
                            />
                        </div>

                        {/* Artist */}
                        <div
                            style={{
                                color: theme.colors.textSecondary,

                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",

                                ...theme.typography.smallText,
                            }}
                        >
                            {song.artist}
                        </div>

                        {/* Duration */}
                        <div
                            style={{
                                color: theme.colors.textSecondary,

                                ...theme.typography.smallText,
                            }}
                        >
                            {Math.floor(song.duration / 60)}:
                            {String(song.duration % 60).padStart(2, "0")}
                        </div>

                        {/* Add */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                cursor: "pointer",

                                transition: "transform 180ms ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            <Plus
                                size={17}
                                strokeWidth={1.6}
                                color={favouriteColor}
                            />
                        </div>

                        {/* Menu */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                cursor: "pointer",

                                color: theme.colors.textSecondary,

                                transition: "all 180ms ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-1px)";

                                e.currentTarget.style.color =
                                    theme.colors.text;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";

                                e.currentTarget.style.color =
                                    theme.colors.textSecondary;
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

            <style>
                {`
        .audio-bar {
            width: 2px;
            border-radius: 999px;
            background: currentColor;
            color: ${theme.colors.text};

            transform-origin: bottom center;

            animation: albumAudio 900ms ease-in-out infinite;
        }

        .bar1 {
            animation-delay: 0ms;
        }

        .bar2 {
            animation-delay: 180ms;
        }

        .bar3 {
            animation-delay: 360ms;
        }

        @keyframes albumAudio {
            0% {
                height: 4px;
            }

            25% {
                height: 12px;
            }

            50% {
                height: 7px;
            }

            75% {
                height: 15px;
            }

            100% {
                height: 4px;
            }
        }
    `}
            </style>
        </div>
    );
}