import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

import { useParams } from "react-router-dom";

import { getPodcast } from "../../services/musicService";

import { useTheme } from "../../context/ThemeContext";

import {
    Play,
    Pause,
    Shuffle,
    AudioLines,
} from "lucide-react";

export default function Podcast() {
    const { theme } = useTheme();

    const { id } = useParams();

    const [podcast, setPodcast] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPodcast() {
            try {
                const data = await getPodcast(id);

                setPodcast(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadPodcast();
    }, [id]);

    const {
        setCurrentTime,
        setHasTrack,
        setIsPlaying,

        setCurrentTrack,
        setAlbumQueue,
        setOriginalAlbumQueue,

        setCurrentTrackIndex,

        currentTrack,
        isPlaying,
    } = useApp();

    const isCurrentTrack = (episode) =>
        currentTrack?.id === episode.id;

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    minHeight: "70vh",

                    color: theme.colors.text,

                    ...theme.typography.body,
                }}
            >
                Loading podcast...
            </div>
        );
    }

    if (!podcast) {
        return null;
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
                    {/* artwork */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,

                            backgroundImage: podcast.artwork
                                ? `url(${podcast.artwork})`
                                : "none",

                            backgroundSize: "cover",

                            backgroundPosition: "center",

                            backgroundRepeat: "no-repeat",
                        }}
                    />
                </div>

                {/* Info */}
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
                            {podcast.title}
                        </h1>

                        {/* add star ad explicit */}
                    </div>

                    {/* Artist */}
                    <div
                        style={{
                            color: theme.colors.text,
                            marginBottom: 8,
                            ...theme.typography.body,
                        }}
                    >
                        {podcast.artist}
                    </div>

                    {/* Year */}
                    <div
                        style={{
                            color: theme.colors.textSecondary,
                            marginBottom: 26,
                            ...theme.typography.smallText,
                        }}
                    >
                        {podcast.genre}
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
                        {podcast.genre}
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
                                if (!podcast.tracks.length) return;

                                setOriginalAlbumQueue(podcast.tracks);

                                setAlbumQueue(podcast.tracks);

                                setCurrentTrackIndex(0);

                                setCurrentTrack(podcast.tracks[0]);

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

            {/* Podcast Header */}
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
                <div>Author</div>
                <div>Time</div>
                <div />
                <div />
            </div>

            {/* Episodes */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                {podcast.tracks.map((episode, index) => (
                    <div
                        key={episode.id}
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "60px minmax(0,1fr) 220px 80px 36px 36px",

                            alignItems: "center",

                            minHeight: 54,

                            padding: "0 18px",

                            borderRadius: 18,

                            cursor: "pointer",

                            transition: "background 180ms ease",
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

                                if (isCurrentTrack(episode)) {
                                    setIsPlaying((playing) => !playing);
                                    return;
                                }

                                setOriginalAlbumQueue(podcast.tracks);

                                setAlbumQueue(podcast.tracks);

                                setCurrentTrackIndex(index);

                                setCurrentTrack(episode);

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
                            {!isCurrentTrack(episode) && (
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

                            {isCurrentTrack(episode) &&
                                isPlaying && (
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
                                        <div className="audio-bar bar1" />
                                        <div className="audio-bar bar2" />
                                        <div className="audio-bar bar3" />
                                    </div>
                                )}

                            {isCurrentTrack(episode) && !isPlaying && (
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

                            {isCurrentTrack(episode) && isPlaying ? (
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

                        {/* title */}
                        <div
                            style={{
                                minWidth: 0,

                                maxWidth: "75%", // adjust to taste (70-80%)

                                overflow: "hidden",

                                whiteSpace: "nowrap",

                                textOverflow: "ellipsis",

                                color: theme.colors.text,

                                ...theme.typography.body,
                            }}
                        >
                            {episode.title}
                        </div>

                        <div
                            style={{
                                color: theme.colors.textSecondary,

                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",

                                ...theme.typography.smallText,
                            }}
                        >
                            {episode.artist}
                        </div>

                        <div
                            style={{
                                color: theme.colors.textSecondary,

                                ...theme.typography.smallText,
                            }}
                        >
                            --
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