import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect, useRef } from "react";

import volumeHighIcon from "../../assets/svgs/volume-high.svg";
import playIcon from "../../assets/svgs/play.svg";
import rewindIcon from "../../assets/svgs/rewind.svg";
import fastForwardIcon from "../../assets/svgs/fast-forward.svg";
import microphoneIcon from "../../assets/svgs/microphone.svg";

import pauseIcon from "../../assets/svgs/pause.svg";
import volumeLowIcon from "../../assets/svgs/speaker-low.svg";
import volumeNoneIcon from "../../assets/svgs/speaker-none.svg";
import volumeMuteIcon from "../../assets/svgs/speaker-mute.svg";

import GlassMenu from "../glass/GlassMenu";
import GlassSlideout from "../glass/GlassSlideout";

import {
    Shuffle,
    Repeat,
    Repeat1,

    AudioLines,

    TextAlignJustify,
    MessageSquareQuote,
    Ellipsis,

    ThumbsDown,
    Star,
    Plus,
    ListPlus,
    Square,
} from "lucide-react";

export default function ExpandedPlayer({
    open,
    onClose,

    volume,
    setVolume,

    muted,
    setMuted,

    currentTime,
    setCurrentTime,

    hasTrack,
    setHasTrack,

    duration,

    currentTrack,

    isPlaying,
    setIsPlaying,

    repeatOne,
    setRepeatOne,

    shuffleOn,
    setShuffleOn,

    children,
}) {
    const { theme } = useTheme();

    const dark = theme.mode === "dark";

    const favouriteColor =
        theme.mode === "dark"
            ? "#cd3328"
            : "#e31515";

    const progressRef = useRef(null);

    const [volumeExpanded, setVolumeExpanded] = useState(false);

    const [lyricsOpen, setLyricsOpen] = useState(false);
    const [queueOpen, setQueueOpen] = useState(false);

    const [previousVolume, setPreviousVolume] = useState(100);

    const volumeRef = useRef(null);

    const sliderRef = useRef(null);

    // ellipsis
    const [menuOpen, setMenuOpen] = useState(false);

    const ellipsisRef = useRef(null);

    const [menuPosition, setMenuPosition] = useState({
        top: 0,
        left: 0,
    });

    const menuRef = useRef(null);

    useEffect(() => {
        function handleMenuOutsideClick(event) {
            if (
                menuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !ellipsisRef.current?.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleMenuOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleMenuOutsideClick);
        };
    }, [menuOpen]);

    // playback useEffect
    useEffect(() => {
        if (!isPlaying || !hasTrack) return;

        const timer = setInterval(() => {
            setCurrentTime((time) => {
                if (time >= duration) {
                    clearInterval(timer);

                    setIsPlaying(false);
                    setCurrentTime(duration);

                    return duration;
                }

                return time + 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [
        isPlaying,
        hasTrack,
        duration,
        setCurrentTime,
        setIsPlaying,
    ]);

    // playback helper
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = String(seconds % 60).padStart(2, "0");

        return `${mins}:${secs}`;
    };

    // helper slider time duration progress bar
    const updateProgress = (clientX) => {
        if (!progressRef.current) return;

        const rect = progressRef.current.getBoundingClientRect();

        const percent = Math.max(
            0,
            Math.min(
                1,
                (clientX - rect.left) / rect.width
            )
        );

        setCurrentTime(Math.round(percent * duration));
    };

    const updateVolume = (clientX) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();

        const value = Math.max(
            0,
            Math.min(
                100,
                ((clientX - rect.left) / rect.width) * 100
            )
        );

        setMuted(false);
        setVolume(value);

        if (value > 0) {
            setPreviousVolume(value);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                volumeExpanded &&
                volumeRef.current &&
                !volumeRef.current.contains(event.target)
            ) {
                setVolumeExpanded(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [volumeExpanded]);

    const menuItems = [
        {
            label: "Stop Playing",
            icon: <Square size={14} strokeWidth={1.7} />,
            onClick: () => {
                setIsPlaying(false);
                setHasTrack(false);
                setCurrentTime(0);
                setMenuOpen(false);
                onClose();
            },
        },
        "divider",
        {
            label: "Add to Library",
            icon: <Plus size={15} strokeWidth={1.75} />,
        },
        {
            label: "Add to Playlist",
            icon: <ListPlus size={15} strokeWidth={1.75} />,
        },
        "divider",
        {
            label: "Favourite",
            icon: <Star size={15} strokeWidth={1.75} />,
        },
        {
            label: "Suggest Less",
            icon: <ThumbsDown size={15} strokeWidth={1.75} />,
        },
    ];

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,

                pointerEvents: open ? "auto" : "none",

                zIndex: 900,
            }}
        >
            {/* blurred background */}
            <div
                onClick={onClose}
                style={{
                    position: "absolute",
                    inset: 0,

                    backdropFilter: "blur(2px)",
                    WebkitBackdropFilter: "blur(2px)",

                    background: dark
                        ? "rgba(0,0,0,0.10)"
                        : "rgba(255,255,255,0.08)",

                    opacity: open ? 1 : 0,

                    transition: "opacity 260ms ease",
                }}
            />

            {/* player */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "absolute",

                    left: 0,
                    right: 0,
                    bottom: 0,

                    height: "100vh",

                    background: theme.colors.background,

                    transform: open
                        ? "translateY(0)"
                        : "translateY(100%)",

                    transition:
                        "transform 320ms cubic-bezier(.22,.8,.25,1)",

                    display: "flex",
                    flexDirection: "column",

                    overflow: "hidden",
                }}
            >
                {/* contents */}
                <div
                    style={{
                        height: "100%",
                        transition: "transform 260ms ease",

                        transform:
                            lyricsOpen || queueOpen
                                ? "translateX(-340px)"
                                : "translateX(0)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",

                            height: "100%",

                            padding: "34px 42px",
                        }}
                    >
                        {/* Row 1 */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",

                                gap: 22,
                            }}
                        >
                            <div
                                ref={volumeRef}
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {/* volume slideout */}
                                <div
                                    style={{
                                        position: "absolute",

                                        right: 34,

                                        top: "50%",
                                        transform: "translateY(-50%)",

                                        width: volumeExpanded ? 140 : 0,

                                        height: 36,

                                        overflow: "hidden",

                                        display: "flex",
                                        alignItems: "center",

                                        padding: volumeExpanded ? "0 16px" : "0",

                                        borderRadius: 9999,

                                        transition:
                                            "width 240ms ease, padding 240ms ease, opacity 240ms ease",

                                        opacity: volumeExpanded ? 1 : 0,

                                        background:
                                            theme.mode === "dark"
                                                ? "rgb(16, 16, 16)"
                                                : "rgb(255, 255, 255)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 8px 20px rgba(0, 0, 0, 0.7)"
                                                : `
                                            0 8px 20px rgba(0, 0, 0, 0.17),
                                            inset 0 1px 0 rgba(255,255,255,0.95)
                                          `,
                                    }}
                                >
                                    <div
                                        ref={sliderRef}
                                        onMouseDown={(e) => {
                                            updateVolume(e.clientX);

                                            const handleMove = (moveEvent) => {
                                                updateVolume(moveEvent.clientX);
                                            };

                                            const handleUp = () => {
                                                window.removeEventListener("mousemove", handleMove);
                                                window.removeEventListener("mouseup", handleUp);
                                            };

                                            window.addEventListener("mousemove", handleMove);
                                            window.addEventListener("mouseup", handleUp);
                                        }}
                                        onMouseLeave={() => {
                                            setVolumeExpanded(false);
                                        }}
                                        style={{
                                            position: "relative",

                                            width: "100%",
                                            height: 16,

                                            display: "flex",
                                            alignItems: "center",

                                            cursor: "pointer",
                                        }}
                                    >
                                        {/* Track */}
                                        <div
                                            style={{
                                                width: "100%",
                                                height: 5,

                                                borderRadius: 9999,

                                                background:
                                                    theme.mode === "dark"
                                                        ? "rgba(255,255,255,0.14)"
                                                        : "rgba(0,0,0,0.12)",
                                            }}
                                        />

                                        {/* Fill */}
                                        <div
                                            style={{
                                                position: "absolute",

                                                left: 0,

                                                width: `${muted ? 0 : volume}%`,

                                                height: 5,

                                                borderRadius: 9999,

                                                background: theme.colors.text,

                                                transition: "width 120ms ease",
                                            }}
                                        />
                                    </div>
                                </div>

                                <img
                                    src={
                                        muted
                                            ? volumeMuteIcon
                                            : volume >= 70
                                                ? volumeHighIcon
                                                : volume >= 40
                                                    ? volumeLowIcon
                                                    : volumeNoneIcon
                                    }
                                    alt="Volume"
                                    onClick={() => {
                                        // setMenuOpen(false);

                                        if (!volumeExpanded) {
                                            setVolumeExpanded(true);
                                            return;
                                        }

                                        if (muted) {
                                            setMuted(false);
                                            setVolume(previousVolume || 100);
                                        } else {
                                            setPreviousVolume(volume);
                                            setMuted(true);
                                        }
                                    }}
                                    style={{
                                        width: 23,
                                        height: 23,

                                        cursor: "pointer",

                                        transition: "transform 180ms ease",

                                        filter:
                                            theme.mode === "dark"
                                                ? "invert(1)"
                                                : "invert(0)",
                                    }}
                                />
                            </div>

                            {/* Close */}
                            <div
                                onClick={() => {
                                    onClose();
                                    setQueueOpen(false);
                                    setLyricsOpen(false);
                                }}
                                style={{
                                    width: 30,
                                    height: 30,

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    cursor: "pointer",

                                    color: theme.colors.text,

                                    ...theme.typography.body,

                                    transition: "transform 180ms ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = "scale(.92)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                            >
                                ×
                            </div>

                        </div>

                        {/* Row 2 - Artwork */}
                        <div
                            style={{
                                flex: 1,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                style={{
                                    width: 420,
                                    aspectRatio: "1",

                                    borderRadius: 38,

                                    backgroundImage: currentTrack?.artwork
                                        ? `url(${currentTrack.artwork})`
                                        : "none",

                                    backgroundSize: "cover",

                                    backgroundPosition: "center",

                                    backgroundColor:
                                        theme.mode === "dark"
                                            ? "rgba(32,32,32,.08)"
                                            : "rgba(255,255,255,.60)",

                                    boxShadow:
                                        theme.mode === "dark"
                                            ? "0 28px 70px rgba(0,0,0,.42)"
                                            : `
                        0 28px 70px rgba(0,0,0,.10),
                        inset 0 1px 0 rgba(255,255,255,.95)
                      `,

                                    transition: "all 260ms ease",
                                }}
                            />
                        </div>

                        {/* Row 3 */}
                        <div
                            style={{
                                width: 420,
                                alignSelf: "center",

                                marginTop: 5,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* Artist */}
                            <div
                                style={{
                                    color: theme.colors.textSecondary,

                                    ...theme.typography.body,
                                }}
                            >
                                {currentTrack?.artist}
                            </div>

                            {/* Actions */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 16,
                                }}
                            >

                                {/* Explicit */}
                                {currentTrack?.explicit && (
                                    <div
                                        style={{
                                            width: 16,
                                            height: 16,

                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",

                                            borderRadius: 4,

                                            background:
                                                theme.mode === "dark"
                                                    ? "rgba(255,255,255,0.10)"
                                                    : "rgba(0,0,0,0.10)",

                                            color:
                                                theme.mode === "dark"
                                                    ? "#D6D6D2"
                                                    : "#4A4A47",

                                            fontSize: 9,
                                            fontWeight: 700,

                                            userSelect: "none",
                                        }}
                                    >
                                        E
                                    </div>
                                )}

                                <Star
                                    size={17}
                                    strokeWidth={1.6}
                                    color={favouriteColor}
                                    fill={favouriteColor}
                                    style={{
                                        cursor: "pointer",
                                        transition: "transform 180ms ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                />

                                <div
                                    ref={menuRef}
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Ellipsis
                                        ref={ellipsisRef}
                                        size={20}
                                        strokeWidth={1.6}
                                        color={theme.colors.text}
                                        onClick={() => {
                                            if (!menuOpen && ellipsisRef.current) {
                                                const MENU_WIDTH = 230;
                                                const MENU_HEIGHT = 230;
                                                const GAP = 33;

                                                const rect = ellipsisRef.current.getBoundingClientRect();

                                                setMenuPosition({
                                                    left: rect.left + rect.width / 2 - MENU_WIDTH / 2,
                                                    top: rect.top - MENU_HEIGHT - GAP,
                                                });
                                            }

                                            setMenuOpen((open) => !open);
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            transition: "transform 180ms ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-1px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 4 - Song Title */}
                        <div
                            style={{
                                width: 420,
                                alignSelf: "center",

                                marginTop: 6,
                            }}
                        >
                            <div
                                style={{
                                    color: theme.colors.text,

                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",

                                    ...theme.typography.title,
                                }}
                            >
                                {currentTrack?.title}
                            </div>
                        </div>

                        {/* Row 5 - Progress Slider */}
                        <div
                            style={{
                                width: 420,
                                alignSelf: "center",

                                marginTop: 24,
                            }}
                        >
                            <div
                                ref={progressRef}
                                onMouseDown={(e) => {
                                    // will always have a track
                                    // if (!hasTrack) return;

                                    updateProgress(e.clientX);

                                    const handleMove = (moveEvent) => {
                                        updateProgress(moveEvent.clientX);
                                    };

                                    const handleUp = () => {
                                        window.removeEventListener("mousemove", handleMove);
                                        window.removeEventListener("mouseup", handleUp);
                                    };

                                    window.addEventListener("mousemove", handleMove);
                                    window.addEventListener("mouseup", handleUp);
                                }}
                                style={{
                                    position: "relative",

                                    width: "100%",
                                    height: 6,

                                    cursor: "pointer",

                                    borderRadius: 999,

                                    background:
                                        theme.mode === "dark"
                                            ? "rgba(255,255,255,0.12)"
                                            : "rgba(0,0,0,0.10)",
                                }}
                            >
                                {/* Progress */}
                                <div
                                    style={{
                                        position: "absolute",

                                        left: 0,
                                        top: 0,
                                        bottom: 0,

                                        width: `${(currentTime / duration) * 100}%`,

                                        borderRadius: 999,

                                        background: theme.colors.text,
                                    }}
                                />

                                {/* Thumb */}
                                <div
                                    style={{
                                        position: "absolute",

                                        left: `calc(${(currentTime / duration) * 100}% - 7px)`,
                                        top: "50%",

                                        width: 14,
                                        height: 14,

                                        borderRadius: "50%",

                                        transform: "translateY(-50%)",

                                        background: theme.colors.text,

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 4px 12px rgba(0,0,0,.45)"
                                                : "0 4px 12px rgba(0,0,0,.18)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Row 6 - Time */}
                        <div
                            style={{
                                width: 420,
                                alignSelf: "center",

                                marginTop: 8,

                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    color: theme.colors.textSecondary,

                                    ...theme.typography.smallText,
                                }}
                            >
                                {formatTime(currentTime)}
                            </div>

                            <div
                                style={{
                                    color: theme.colors.textSecondary,

                                    ...theme.typography.smallText,
                                }}
                            >
                                {formatTime(duration)}
                            </div>
                        </div>

                        {/* Row 7 - Playback Controls */}
                        <div
                            style={{
                                width: 420,
                                alignSelf: "center",

                                marginTop: 28,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                gap: 30,
                            }}
                        >
                            {/* Shuffle */}
                            <div
                                onClick={() => {
                                    setShuffleOn((on) => !on);
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    width: 24,
                                    height: 24,

                                    cursor: "pointer",

                                    borderRadius: "50%",

                                    transition: "all 120ms ease",

                                    boxShadow: shuffleOn
                                        ? theme.mode === "dark"
                                            ? "0 6px 14px rgba(0,0,0,0.22)"
                                            : `
            0 8px 20px rgba(0, 0, 0, 0.11),
            inset 0 1px 0 rgba(255,255,255,0.95)
          `
                                        : "none",

                                    background: shuffleOn
                                        ? theme.mode === "dark"
                                            ? "rgba(255,255,255,0.05)"
                                            : "rgba(255,255,255,0.9)"
                                        : "transparent",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = "scale(.94)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                            >
                                <Shuffle
                                    size={16}
                                    strokeWidth={2}
                                    color={theme.colors.text}
                                />
                            </div>

                            {/* Rewind */}
                            <img
                                src={rewindIcon}
                                alt="Rewind"
                                draggable={false}
                                style={{
                                    width: 22,
                                    height: 22,

                                    cursor: "pointer",

                                    userSelect: "none",
                                    WebkitUserDrag: "none",

                                    transition: "transform 120ms ease",

                                    filter:
                                        theme.mode === "dark"
                                            ? "invert(1)"
                                            : "invert(0)",
                                }}
                                onClick={() => {
                                    // build later restart song or prev song
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = "scale(0.94)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                            />

                            {/* Play / Pause */}
                            <img
                                onClick={() => {
                                    setIsPlaying((playing) => !playing);
                                }}
                                src={isPlaying ? pauseIcon : playIcon}
                                alt={isPlaying ? "Pause" : "Play"}
                                draggable={false}
                                style={{
                                    width: 38,
                                    height: 38,

                                    cursor: "pointer",

                                    userSelect: "none",
                                    WebkitUserDrag: "none",

                                    transition: "transform 120ms ease",

                                    filter:
                                        theme.mode === "dark"
                                            ? "invert(1)"
                                            : "invert(0)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = "scale(0.94)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                            />

                            {/* Fast Forward */}
                            <img
                                src={fastForwardIcon}
                                alt="Fast Forward"
                                draggable={false}
                                style={{
                                    width: 22,
                                    height: 22,

                                    cursor: "pointer",

                                    transition: "transform 120ms ease",

                                    userSelect: "none",
                                    WebkitUserDrag: "none",

                                    transition: "transform 120ms ease",

                                    filter:
                                        theme.mode === "dark"
                                            ? "invert(1)"
                                            : "invert(0)",
                                }}
                                onClick={() => {
                                    // build later next song in queue
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = "scale(0.94)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                            />

                            {/* Repeat */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    width: 24,
                                    height: 24,

                                    cursor: "pointer",

                                    transition: "transform 120ms ease",
                                }}
                            >
                                {repeatOne ? (
                                    <Repeat1
                                        size={16}
                                        strokeWidth={2}
                                        color={theme.colors.text}
                                        onClick={() => {
                                            setRepeatOne(false);
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-1px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                        }}
                                        onMouseDown={(e) => {
                                            e.currentTarget.style.transform = "scale(0.94)";
                                        }}
                                        onMouseUp={(e) => {
                                            e.currentTarget.style.transform = "translateY(-1px)";
                                        }}
                                        style={{
                                            transition: "transform 120ms ease",

                                            cursor: "pointer",
                                        }}
                                    />
                                ) : (
                                    <Repeat
                                        size={16}
                                        strokeWidth={2}
                                        color={theme.colors.text}
                                        onClick={() => {
                                            setRepeatOne(true);
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-1px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                        }}
                                        onMouseDown={(e) => {
                                            e.currentTarget.style.transform = "scale(0.94)";
                                        }}
                                        onMouseUp={(e) => {
                                            e.currentTarget.style.transform = "translateY(-1px)";
                                        }}
                                        style={{
                                            transition: "transform 120ms ease",

                                            cursor: "pointer",
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* row 8 */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",

                                    gap: 20,
                                }}
                            >
                                {/* opens lyrics slideout */}
                                <MessageSquareQuote
                                    size={19}
                                    strokeWidth={1.5}
                                    color={theme.colors.text}
                                    onClick={() => {
                                        setLyricsOpen((open) => !open);
                                        setQueueOpen(false);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        transition: "transform 180ms ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.transform = "scale(0.88)";
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }}
                                />

                                {/* opens queue slideout */}
                                <TextAlignJustify
                                    size={16}
                                    strokeWidth={1.5}
                                    color={theme.colors.text}
                                    onClick={() => {
                                        setQueueOpen((open) => !open);
                                        setLyricsOpen(false);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        transition: "transform 180ms ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.transform = "scale(0.88)";
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }}
                                />
                            </div>

                        </div>

                        {children}
                    </div> {/* end contents wrapper */}
                </div>
                {/* lyrics slideout */}
                <GlassSlideout
                    open={lyricsOpen}
                >
                    <div
                        style={{
                            height: "100%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            padding: 40,

                            textAlign: "center",

                            color: theme.colors.textSecondary,

                            ...theme.typography.body,
                        }}
                    >
                        Play a song to see lyrics here
                    </div>
                </GlassSlideout>

                {/* queue slideout */}
                <GlassSlideout
                    open={queueOpen}
                >
                    <div
                        style={{
                            height: "100%",

                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                padding: "32px",

                                color: theme.colors.text,

                                ...theme.typography.title,
                            }}
                        >
                            Up Next
                        </div>

                        <div
                            style={{
                                flex: 1,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                color: theme.colors.textSecondary,

                                ...theme.typography.body,
                            }}
                        >
                            No upcoming songs
                        </div>
                    </div>
                </GlassSlideout>
            </div> {/* end player wrapper */}
            <GlassMenu
                ref={menuRef}
                open={menuOpen}
                top={menuPosition.top}
                left={menuPosition.left}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,

                    }}
                >
                    {menuItems.map((item, index) =>
                        item === "divider" ? (
                            <div
                                key={index}
                                style={{
                                    height: 1,
                                    margin: "6px 4px",

                                    background:
                                        theme.mode === "dark"
                                            ? "rgba(255,255,255,0.05)"
                                            : "rgba(0,0,0,0.08)",
                                }}
                            />
                        ) : (
                            <div
                                onClick={() => {
                                    item.onClick?.();
                                }}
                                key={item.label}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,

                                    height: 34,

                                    padding: "0 12px",

                                    borderRadius: 14,

                                    cursor: "pointer",

                                    color: theme.colors.textSecondary,

                                    transition: "all 180ms ease",

                                    ...theme.typography.smallText,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.color = theme.colors.text;

                                    if (theme.mode === "light") {
                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.65)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.color =
                                        theme.colors.textSecondary;
                                    e.currentTarget.style.background = "transparent";
                                }}
                            >
                                <>
                                    <div
                                        style={{
                                            width: 18,

                                            display: "flex",
                                            justifyContent: "center",

                                            flexShrink: 0,

                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                    <span>{item.label}</span>
                                </>
                            </div>
                        )
                    )}
                </div>
            </GlassMenu>
        </div>
    );
}