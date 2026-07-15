import GlassPanel from "../glass/GlassPanel";

import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

import volumeHighIcon from "../../assets/svgs/volume-high.svg";
import playIcon from "../../assets/svgs/play.svg";
import rewindIcon from "../../assets/svgs/rewind.svg";
import fastForwardIcon from "../../assets/svgs/fast-forward.svg";
import microphoneIcon from "../../assets/svgs/microphone.svg";

import pauseIcon from "../../assets/svgs/pause.svg";
import volumeLowIcon from "../../assets/svgs/speaker-low.svg";
import volumeNoneIcon from "../../assets/svgs/speaker-none.svg";
import volumeMuteIcon from "../../assets/svgs/speaker-mute.svg";


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
} from "lucide-react";

export default function FloatingPlayer({
    signedIn,
}) {
    const { theme } = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [repeatOne, setRepeatOne] = useState(false);
    const [shuffleOn, setShuffleOn] = useState(false);

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
                left: "58.5%", // needs to be dead center instead of hardcoded
                bottom: 42,
                transform: "translateX(-50%)",
                zIndex: 100,
            }}
        >
            <GlassPanel
                style={{
                    width: 750,
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
                        <TextAlignJustify
                            size={16}
                            strokeWidth={1.5}
                            color={theme.colors.text}
                        />

                        <img
                            src={volumeHighIcon}
                            alt="Volume"
                            style={{
                                width: 23,
                                height: 23,

                                filter:
                                    theme.mode === "dark"
                                        ? "invert(1)"
                                        : "invert(0)",
                            }}
                        />
                    </div>
                </div>
            </GlassPanel>
        </div>
    );
}