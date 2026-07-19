import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useEffect, useState } from "react";
import { getRadio } from "../../services/radioService";

import React from "react";

import {
    Play,
    AudioLines,
} from "lucide-react";

export default function Radio() {
    const { theme } = useTheme();

    const [radio, setRadio] = useState(null);

    const [loading, setLoading] = useState(true);

    const {
        setCurrentTime,
        setHasTrack,
        setIsPlaying,
    } = useApp();

    useEffect(() => {
        async function loadRadio() {
            try {
                const data = await getRadio();

                setRadio(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadRadio();
    }, []);

    const artistTakeover =
        radio?.artistTakeover || [];

    const liveSessions =
        radio?.liveSessions || [];

    const djMixes =
        radio?.djMixes || [];

    const rockRadio =
        radio?.rockRadio || [];

    const hipHopRadio =
        radio?.hipHopRadio || [];

    const houseRadio =
        radio?.houseRadio || [];

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
                Radio
            </h1>

            {/* ---------- DJ Mixes ---------- */}
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
                    DJ Mixes
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
                    {djMixes.map((station, index) => {
                        const genre = station.album;

                        return (
                            <div
                                key={station.id}
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

                                        overflow: "visible",

                                        backgroundImage: station.artwork
                                            ? `url(${station.artwork})`
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
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,

                                                marginBottom: 40,
                                            }}
                                        >
                                            <AudioLines
                                                size={15}
                                                strokeWidth={2}
                                                color="#ECECE8"
                                            />

                                            <span
                                                style={{
                                                    color: "#ECECE8",
                                                    ...theme.typography.label,
                                                }}
                                            >
                                                Music
                                            </span>
                                        </div>
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

                                    {/* type */}
                                    <div
                                        style={{
                                            position: "absolute",

                                            left: 20,
                                            bottom: 20,

                                            color: "#ECECE8",

                                            ...theme.typography.title2,
                                        }}
                                    >
                                        Mix
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
                                        {station.name}
                                    </div>
                                </div>

                                {/* subtitle */}
                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {station.album}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ---------- Artist Takeover ---------- */}
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
                    Artist Takeover
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
                    {artistTakeover.map((station, index) => {
                        const genre = station.album;

                        return (
                            <div
                                key={station.id}
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

                                        overflow: "visible",

                                        backgroundImage: station.artwork
                                            ? `url(${station.artwork})`
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
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,

                                                marginBottom: 40,
                                            }}
                                        >
                                            <AudioLines
                                                size={15}
                                                strokeWidth={2}
                                                color="#ECECE8"
                                            />

                                            <span
                                                style={{
                                                    color: "#ECECE8",
                                                    ...theme.typography.label,
                                                }}
                                            >
                                                Music
                                            </span>
                                        </div>
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
                                        {station.name}
                                    </div>
                                </div>

                                {/* subtitle */}
                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    Artist
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ---------- Live ---------- */}
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
                    Live Sessions
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
                    {liveSessions.map((station, index) => {
                        const genre = station.album;

                        return (
                            <div
                                key={station.id}
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

                                        overflow: "visible",

                                        backgroundImage: station.artwork
                                            ? `url(${station.artwork})`
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
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,

                                                marginBottom: 40,
                                            }}
                                        >
                                            <AudioLines
                                                size={15}
                                                strokeWidth={2}
                                                color="#ECECE8"
                                            />

                                            <span
                                                style={{
                                                    color: "#ECECE8",
                                                    ...theme.typography.label,
                                                }}
                                            >
                                                Music
                                            </span>
                                        </div>
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

                                    {/* type */}
                                    <div
                                        style={{
                                            position: "absolute",

                                            left: 20,
                                            bottom: 20,

                                            color: "#ECECE8",

                                            ...theme.typography.title2,
                                        }}
                                    >
                                        Live
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
                                        {station.name}
                                    </div>
                                </div>

                                {/* subtitle */}
                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {station.album}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* HIP HOP STATION */}
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
                    Hip Hop Station
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
                    {hipHopRadio.map((station, index) => {
                        const genre = station.album;

                        return (
                            <div
                                key={station.id}
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

                                        overflow: "visible",

                                        backgroundImage: station.artwork
                                            ? `url(${station.artwork})`
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
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,

                                                marginBottom: 40,
                                            }}
                                        >
                                            <AudioLines
                                                size={15}
                                                strokeWidth={2}
                                                color="#ECECE8"
                                            />

                                            <span
                                                style={{
                                                    color: "#ECECE8",
                                                    ...theme.typography.label,
                                                }}
                                            >
                                                Music
                                            </span>
                                        </div>
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
                                        {station.name}
                                    </div>
                                </div>

                                {/* subtitle */}
                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {station.album}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ---------- Rock Station ---------- */}
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
                    Rock Station
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
                    {rockRadio.map((station, index) => {
                        const genre = station.album;

                        return (
                            <div
                                key={station.id}
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

                                        overflow: "visible",

                                        backgroundImage: station.artwork
                                            ? `url(${station.artwork})`
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
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,

                                                marginBottom: 40,
                                            }}
                                        >
                                            <AudioLines
                                                size={15}
                                                strokeWidth={2}
                                                color="#ECECE8"
                                            />

                                            <span
                                                style={{
                                                    color: "#ECECE8",
                                                    ...theme.typography.label,
                                                }}
                                            >
                                                Music
                                            </span>
                                        </div>
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
                                        {station.name}
                                    </div>
                                </div>

                                {/* subtitle */}
                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {station.album}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ---------- House Station ---------- */}
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
                    House Station
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
                    {houseRadio.map((station, index) => {
                        const genre = station.album;

                        return (
                            <div
                                key={station.id}
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

                                        overflow: "visible",

                                        backgroundImage: station.artwork
                                            ? `url(${station.artwork})`
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
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,

                                                marginBottom: 40,
                                            }}
                                        >
                                            <AudioLines
                                                size={15}
                                                strokeWidth={2}
                                                color="#ECECE8"
                                            />

                                            <span
                                                style={{
                                                    color: "#ECECE8",
                                                    ...theme.typography.label,
                                                }}
                                            >
                                                Music
                                            </span>
                                        </div>
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
                                        {station.name}
                                    </div>
                                </div>

                                {/* subtitle */}
                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {station.album}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}