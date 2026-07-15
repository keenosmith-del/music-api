import GlassPanel from "../glass/GlassPanel";

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


import {
    Shuffle,
    SkipBack,
    Play,
    SkipForward,
    Repeat,
    Repeat1,
    AudioLines,
    TextAlignJustify,
    Rewind,
    FastForward,
    MessageSquareQuote,
    Ellipsis,
} from "lucide-react";

export default function FloatingPlayer({
    signedIn,
    queueOpen,
    setQueueOpen,
    lyricsOpen,
    setLyricsOpen,
}) {
    const { theme } = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [repeatOne, setRepeatOne] = useState(false);
    const [shuffleOn, setShuffleOn] = useState(false);

    // volume states
    const [volumeExpanded, setVolumeExpanded] = useState(false);

    const [volume, setVolume] = useState(100);

    const [muted, setMuted] = useState(false);

    const [previousVolume, setPreviousVolume] = useState(100);

    const volumeRef = useRef(null);

    const sliderRef = useRef(null);

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
                !menuRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleMenuOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleMenuOutsideClick);
        };
    }, [menuOpen]);

    // icons
    const iconFill =
        theme.mode === "dark"
            ? "#ECECE8"
            : "#242424";

    // switch to make icon crisper
    const iconColor =
        theme.mode === "dark"
            ? "#242424"
            : "#ECECE8"

    return (
        <div
            style={{
                position: "fixed",
                left: queueOpen || lyricsOpen ? "25.5%" : "36.5%",
                transition: "left 260ms ease",
                bottom: 42,
                zIndex: 100,
            }}
        >
            <GlassPanel
                style={{
                    width: 710,
                    height: 55,
                    borderRadius: 9999,
                }}
            >
                <div
                    style={{
                        height: "100%",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "space-between",

                        padding: "0 22px",
                    }}
                >
                    {/* LEFT CONTROLS */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 18,
                        }}
                    >
                        <div
                            onClick={() => {
                                if (!signedIn) return;
                                setShuffleOn((on) => !on);
                            }}
                            onMouseEnter={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            onMouseDown={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "scale(0.94)";
                            }}
                            onMouseUp={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            style={{
                                width: 24,
                                height: 24,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                cursor: signedIn ? "pointer" : "default",

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
                        >
                            <Shuffle
                                size={14}
                                strokeWidth={2}
                                color={theme.colors.text}
                            />
                        </div>
                        <img
                            src={rewindIcon}
                            alt="Rewind"
                            draggable={false}
                            onClick={() => {
                                if (!signedIn) return;
                            }}
                            onMouseEnter={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            onMouseDown={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "scale(0.94)";
                            }}
                            onMouseUp={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            style={{
                                width: 20,
                                height: 20,

                                display: "block",

                                cursor: signedIn ? "pointer" : "default",

                                userSelect: "none",
                                WebkitUserDrag: "none",

                                transition: "transform 120ms ease",

                                filter:
                                    theme.mode === "dark"
                                        ? "invert(1)"
                                        : "invert(0)",
                            }}
                        />
                        {/* play */}
                        <img
                            src={isPlaying ? pauseIcon : playIcon}
                            alt={isPlaying ? "Pause" : "Play"}
                            draggable={false}
                            onClick={() => {
                                if (!signedIn) return;
                                setIsPlaying((playing) => !playing);
                            }}
                            onMouseEnter={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            onMouseDown={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "scale(0.94)";
                            }}
                            onMouseUp={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            style={{
                                width: 32,
                                height: 32,

                                display: "block",

                                cursor: signedIn ? "pointer" : "default",

                                userSelect: "none",
                                WebkitUserDrag: "none",

                                transition: "transform 120ms ease",

                                // opacity: !signedIn ? theme.mode === "dark" ? "0.55" : "0.85" : "1",

                                filter:
                                    theme.mode === "dark"
                                        ? "invert(1)"
                                        : "invert(0)",
                            }}
                        />

                        <img
                            src={fastForwardIcon}
                            alt="FastForward"
                            draggable={false}
                            onClick={() => {
                                if (!signedIn) return;
                            }}
                            onMouseEnter={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            onMouseDown={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "scale(0.94)";
                            }}
                            onMouseUp={(e) => {
                                if (!signedIn) return;
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            style={{
                                width: 20,
                                height: 20,

                                display: "block",

                                cursor: signedIn ? "pointer" : "default",

                                userSelect: "none",
                                WebkitUserDrag: "none",

                                transition: "transform 120ms ease",

                                filter:
                                    theme.mode === "dark"
                                        ? "invert(1)"
                                        : "invert(0)",
                            }}
                        />
                        {repeatOne ? (
                            <Repeat1
                                size={14}
                                strokeWidth={2}
                                color={theme.colors.text}
                                onClick={() => {
                                    if (!signedIn) return;
                                    setRepeatOne(false);
                                }}
                                onMouseEnter={(e) => {
                                    if (!signedIn) return;
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                onMouseDown={(e) => {
                                    if (!signedIn) return;
                                    e.currentTarget.style.transform = "scale(0.94)";
                                }}
                                onMouseUp={(e) => {
                                    if (!signedIn) return;
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                style={{
                                    cursor: signedIn ? "pointer" : "default",
                                    transition: "transform 120ms ease",
                                }}
                            />
                        ) : (
                            <Repeat
                                size={14}
                                strokeWidth={2}
                                color={theme.colors.text}
                                onClick={() => {
                                    if (!signedIn) return;
                                    setRepeatOne(true);
                                }}
                                onMouseEnter={(e) => {
                                    if (!signedIn) return;
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                onMouseDown={(e) => {
                                    if (!signedIn) return;
                                    e.currentTarget.style.transform = "scale(0.94)";
                                }}
                                onMouseUp={(e) => {
                                    if (!signedIn) return;
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                style={{
                                    cursor: signedIn ? "pointer" : "default",
                                    transition: "transform 120ms ease",
                                }}
                            />
                        )}
                    </div>

                    {/* CENTER CONTROLS */}
                    <img
                        src={microphoneIcon}
                        alt="Microphone"
                        style={{
                            width: 18,
                            height: 18,

                            opacity: "0.45",

                            filter:
                                theme.mode === "dark"
                                    ? "invert(1)"
                                    : "invert(0)",
                        }}
                    />

                    {/* RIGHT CONTROLS */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 18,
                        }}
                    >
                        {/* ellipsis */}
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
                                size={19}
                                strokeWidth={1.5}
                                color={theme.colors.text}
                                onClick={() => {
                                    if (!signedIn) return;

                                    if (!menuOpen && ellipsisRef.current) {
                                        const MENU_WIDTH = 230;
                                        const MENU_HEIGHT = 170;
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
                                    cursor: signedIn ? "pointer" : "default",
                                    transition: "transform 180ms ease",
                                    opacity: signedIn ? "1" : "0",
                                }}
                                onMouseEnter={(e) => {
                                    if (!signedIn) return;

                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                onMouseDown={(e) => {
                                    if (!signedIn) return;

                                    e.currentTarget.style.transform = "scale(0.88)";
                                }}
                                onMouseUp={(e) => {
                                    if (!signedIn) return;

                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                            />
                        </div>

                        <MessageSquareQuote
                            size={19}
                            strokeWidth={1.5}
                            color={theme.colors.text}
                            onClick={() => {
                                if (!signedIn) return;

                                setLyricsOpen((open) => !open);
                                setQueueOpen(false);
                                setMenuOpen(false);
                            }}
                            style={{
                                cursor: signedIn ? "pointer" : "default",
                                transition: "transform 180ms ease",
                                opacity: signedIn ? "1" : "0",
                            }}
                            onMouseEnter={(e) => {
                                if (!signedIn) return;

                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            onMouseDown={(e) => {
                                if (!signedIn) return;

                                e.currentTarget.style.transform = "scale(0.88)";
                            }}
                            onMouseUp={(e) => {
                                if (!signedIn) return;

                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                        />

                        <TextAlignJustify
                            size={16}
                            strokeWidth={1.5}
                            color={theme.colors.text}
                            onClick={() => {
                                if (!signedIn) return;

                                setQueueOpen((open) => !open);
                                setLyricsOpen(false);
                                setMenuOpen(false);
                            }}
                            style={{
                                cursor: signedIn ? "pointer" : "default",
                                transition: "transform 180ms ease",
                            }}
                            onMouseEnter={(e) => {
                                if (!signedIn) return;

                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            onMouseDown={(e) => {
                                if (!signedIn) return;

                                e.currentTarget.style.transform = "scale(0.88)";
                            }}
                            onMouseUp={(e) => {
                                if (!signedIn) return;

                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                        />

                        <div
                            ref={volumeRef}
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {/* volume slideout will live here */}
                            <div
                                style={{
                                    position: "absolute",

                                    right: 34,

                                    top: "50%",
                                    transform: "translateY(-50%)",

                                    width: volumeExpanded ? 180 : 0,

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

                                    // border: theme.mode === "dark" ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(255,255,255,0.95)",

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
                                        if (!signedIn) return;

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
                                        if (!signedIn) return;

                                        setVolumeExpanded(false);
                                    }}
                                    style={{
                                        position: "relative",

                                        width: "100%",
                                        height: 16,

                                        display: "flex",
                                        alignItems: "center",

                                        cursor: signedIn ? "pointer" : "default",
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
                                    if (!signedIn) return;

                                    setMenuOpen(false);

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

                                    cursor: signedIn ? "pointer" : "default",

                                    transition: "transform 180ms ease",

                                    filter:
                                        theme.mode === "dark"
                                            ? "invert(1)"
                                            : "invert(0)",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </GlassPanel>
            <GlassMenu
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
                    {[
                        "Add to Library",
                        "Add to Playlist",
                        "",
                        "Favourite",
                        "Suggest Less",
                    ].map((item, index) =>
                        item === "" ? (
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
                                key={item}
                                style={{
                                    display: "flex",
                                    alignItems: "center",

                                    height: 34,

                                    padding: "0 12px",

                                    borderRadius: 14,

                                    cursor: "pointer",

                                    color: theme.colors.textSecondary,

                                    transition: "all 180ms ease",

                                    ...theme.typography.body,
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
                                {item}
                            </div>
                        )
                    )}
                </div>
            </GlassMenu>
        </div>
    );
}