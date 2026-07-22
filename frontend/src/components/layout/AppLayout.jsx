//
import { Outlet } from "react-router-dom";

import { AppProvider } from "../../context/AppContext";

import AppCanvas from "./AppCanvas";

import ThemeToggle from "../common/ThemeToggle";

import { useTheme } from "../../context/ThemeContext";

import { useState, useRef, useEffect } from "react";

import { getUser } from "../../services/userService";

import { useNavigate, useLocation } from "react-router-dom";

import React from "react";

import musicIcon from "../../assets/svgs/music-thin.svg";

import GlassSlideout from "../glass/GlassSlideout";
import ExpandedPlayer from "../player/ExpandedPlayer";

import { getAutoplay } from "../../services/musicService";

import {
    AudioLines,
    UserRound,
    Music,
    Play,
    Star,
    Shuffle,
    RefreshCw,
    Pause,
} from "lucide-react";

export default function AppLayout({
    sidebar,
    children,
    player,
}) {
    // STATES 
    const navigate = useNavigate();
    const location = useLocation();

    const { theme } = useTheme();

    const dark = theme.mode === "dark";

    const [user, setUser] = useState(null);

    const [signedIn, setSignedIn] = useState(() => {
        return localStorage.getItem("signedIn") === "true";
    });

    useEffect(() => {
        async function restoreUser() {
            try {
                const data = await getUser();

                if (data) {
                    setUser(data);
                }
            } catch (err) {
                console.error("Unable to restore user.", err);
            }
        }

        restoreUser();
    }, []);

    useEffect(() => {
        localStorage.setItem("signedIn", signedIn);
    }, [signedIn]);

    useEffect(() => {
        if (!signedIn && location.pathname !== "/") {
            navigate("/");
        }
    }, [signedIn, location.pathname, navigate]);

    // Cached page data
    const [homeCache, setHomeCache] = useState(null);
    const [newCache, setNewCache] = useState(null);
    const [radioCache, setRadioCache] = useState(null);
    const [podcastsCache, setPodcastsCache] = useState(null);

    const [albumCache, setAlbumCache] = useState({});

    // slideout music in queue
    // slideout lyrics
    const [queueOpen, setQueueOpen] = useState(false);
    const [lyricsOpen, setLyricsOpen] = useState(false);

    // play
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasTrack, setHasTrack] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef(null);

    // 3:42 = 222 seconds
    const [duration, setDuration] = useState(222);

    // playback state
    const [currentTrack, setCurrentTrack] = useState(null);

    const [albumQueue, setAlbumQueue] = useState([]);

    const [originalAlbumQueue, setOriginalAlbumQueue] = useState([]);

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const [autoplayQueue, setAutoplayQueue] = useState([]);


    const [expandedPlayerOpen, setExpandedPlayerOpen] = useState(false);

    // floating player
    const [repeatOne, setRepeatOne] = useState(false);
    const [shuffleOn, setShuffleOn] = useState(false);

    const [volume, setVolume] = useState(100);
    const [muted, setMuted] = useState(false);
    const [previousVolume, setPreviousVolume] = useState(100);

    const favouriteColor =
        theme.mode === "dark"
            ? "#cd3328"
            : "#e31515";

    console.log("Queue:", albumQueue);
    console.log("Current:", currentTrack);

    return (
        <AppProvider
            value={{
                user,
                setUser,

                signedIn,
                setSignedIn,

                homeCache,
                setHomeCache,

                newCache,
                setNewCache,

                radioCache,
                setRadioCache,

                podcastsCache,
                setPodcastsCache,

                albumCache,
                setAlbumCache,

                hasTrack,
                setHasTrack,

                isPlaying,
                setIsPlaying,

                currentTime,
                setCurrentTime,

                duration,
                setDuration,

                currentTrack,
                setCurrentTrack,

                albumQueue,
                setAlbumQueue,

                autoplayQueue,
                setAutoplayQueue,

                currentTrackIndex,
                setCurrentTrackIndex,

                originalAlbumQueue,
                setOriginalAlbumQueue,

                audioRef,

                queueOpen,
                setQueueOpen,

                lyricsOpen,
                setLyricsOpen,

                expandedPlayerOpen,
                setExpandedPlayerOpen,

                repeatOne,
                setRepeatOne,

                shuffleOn,
                setShuffleOn,

                volume,
                setVolume,

                muted,
                setMuted,

                previousVolume,
                setPreviousVolume,

                favouriteColor,
            }}
        >
            <AppCanvas>
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                    }}
                >
                    {sidebar && React.cloneElement(sidebar, {
                        signedIn,
                        setSignedIn,
                        user,
                        setUser,
                    })}

                    {/* main test */}
                    <main
                        style={{
                            flex: 1,
                            minHeight: "100vh",
                            position: "relative",
                            overflowY: "auto",
                        }}
                    >
                        <Outlet />
                    </main>

                    {/* lyrics slideout */}
                    <GlassSlideout
                        open={lyricsOpen}
                    >
                        <div
                            style={{
                                height: "100%",

                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* Close */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",

                                    padding: "18px 40px 0",
                                }}
                            >
                                <div
                                    onClick={() => {
                                        setLyricsOpen(false);
                                    }}
                                    style={{
                                        opacity: 0,

                                        cursor: "pointer",

                                        color: theme.colors.textSecondary,

                                        transition: "all 180ms ease",

                                        userSelect: "none",

                                        ...theme.typography.body,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = "1";
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                        e.currentTarget.style.color =
                                            theme.colors.text;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = "0";
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.color =
                                            theme.colors.textSecondary;
                                    }}
                                >
                                    ×
                                </div>
                            </div>

                            {/* Placeholder */}
                            <div
                                style={{
                                    flex: 1,

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
                        </div>
                    </GlassSlideout>

                    {/* queue slideout */}
                    <GlassSlideout open={queueOpen} >
                        <div
                            style={{
                                height: "100%",

                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* close */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",

                                    padding: "18px 40px 0",
                                }}
                            >
                                <div
                                    onClick={() => {
                                        setQueueOpen(false);
                                    }}
                                    style={{
                                        opacity: 0,

                                        cursor: "pointer",

                                        color: theme.colors.textSecondary,

                                        transition: "all 180ms ease",

                                        userSelect: "none",

                                        ...theme.typography.body,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = "1";
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                        e.currentTarget.style.color = theme.colors.text;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = "0";
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.color =
                                            theme.colors.textSecondary;
                                    }}
                                >
                                    ×
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",

                                    padding: "24px 28px 18px",

                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        color: theme.colors.text,
                                        ...theme.typography.title,
                                    }}
                                >
                                    Up Next
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: 10,
                                    }}
                                >
                                    {/* Shuffle */}
                                    <button
                                        onClick={() => {
                                            if (!currentTrack) return;

                                            const preservedQueue = albumQueue.slice(
                                                0,
                                                currentTrackIndex + 1
                                            );

                                            const upcoming = [
                                                ...albumQueue.slice(currentTrackIndex + 1),
                                            ];

                                            for (let i = upcoming.length - 1; i > 0; i--) {
                                                const j = Math.floor(
                                                    Math.random() * (i + 1)
                                                );

                                                [upcoming[i], upcoming[j]] = [
                                                    upcoming[j],
                                                    upcoming[i],
                                                ];
                                            }

                                            setShuffleOn(true);

                                            setAlbumQueue([
                                                ...preservedQueue,
                                                ...upcoming,
                                            ]);
                                        }}
                                        style={{
                                            height: 28,
                                            width: 90,
                                            padding: "0 16px",

                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 8,

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

                                            ...theme.typography.smallText,
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
                                            size={11}
                                            strokeWidth={1}
                                        />


                                    </button>

                                    {/* Refresh */}
                                    <button
                                        onClick={async () => {
                                            try {
                                                if (!currentTrack) return;

                                                const songs = await getAutoplay(currentTrack.artist);

                                                if (!songs.length) return;

                                                setAutoplayQueue(songs);

                                                const preservedQueue = albumQueue.slice(
                                                    0,
                                                    currentTrackIndex + 1
                                                );

                                                const newQueue = [
                                                    ...preservedQueue,
                                                    ...songs,
                                                ];

                                                setAlbumQueue(newQueue);
                                            } catch (err) {
                                                console.error(err);
                                            }
                                        }}
                                        style={{
                                            height: 28,
                                            width: 90,

                                            padding: "0 16px",

                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 8,

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

                                            ...theme.typography.smallText,
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
                                        <RefreshCw
                                            size={11}
                                            strokeWidth={1}
                                        />
                                        {/*
                                        <span>Refresh</span>
                                        */}
                                    </button>
                                </div>
                            </div>

                            {albumQueue.length === 0 ? (
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
                            ) : (
                                <div
                                    style={{
                                        flex: 1,

                                        overflowY: "auto",

                                        padding: "0 20px 24px",

                                        display: "flex",
                                        flexDirection: "column",

                                        gap: 10,

                                        cursor: "pointer",

                                        transition:
                                            "transform 180ms ease, background 180ms ease",
                                    }}
                                >
                                    {albumQueue
                                        .slice(currentTrackIndex)
                                        .map((track, index) => (
                                            // row div
                                            <div
                                                key={`${track.id}-${currentTrackIndex + index}`}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",

                                                    gap: 14,

                                                    padding: "10px",

                                                    borderRadius: 18,

                                                    background:
                                                        currentTrack?.id === track.id
                                                            ? theme.mode === "dark"
                                                                ? "rgba(255,255,255,.05)"
                                                                : "rgba(255,255,255,.60)"
                                                            : "transparent",
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentTrack?.id !== track.id) {
                                                        e.currentTarget.style.background =
                                                            theme.mode === "dark"
                                                                ? "rgba(255,255,255,.025)"
                                                                : "rgba(255,255,255,.30)";
                                                    }

                                                    e.currentTarget.style.transform =
                                                        "translateY(-1px) scale(1.01)";
                                                }}

                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background =
                                                        currentTrack?.id === track.id
                                                            ? theme.mode === "dark"
                                                                ? "rgba(255,255,255,.05)"
                                                                : "rgba(255,255,255,.60)"
                                                            : "transparent";

                                                    e.currentTarget.style.transform =
                                                        "translateY(0) scale(1)";
                                                }}
                                            >
                                                {/* artwork */}
                                                <div
                                                    style={{
                                                        position: "relative",

                                                        width: 30,
                                                        height: 30,

                                                        flexShrink: 0,

                                                        overflow: "hidden",

                                                        borderRadius: 6,

                                                        backgroundImage: track.artwork
                                                            ? `url(${track.artwork})`
                                                            : "none",

                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        const overlay =
                                                            e.currentTarget.querySelector(".queue-play");

                                                        if (overlay) {
                                                            overlay.style.opacity = "1";
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        const overlay =
                                                            e.currentTarget.querySelector(".queue-play");

                                                        if (overlay) {
                                                            overlay.style.opacity = "0";
                                                        }
                                                    }}
                                                >
                                                    <div
                                                        className="queue-play"
                                                        onClick={(e) => {
                                                            e.stopPropagation();

                                                            const isCurrent =
                                                                currentTrack?.id === track.id;

                                                            if (isCurrent) {
                                                                setIsPlaying(!isPlaying);
                                                                return;
                                                            }

                                                            setCurrentTrack(track);

                                                            setCurrentTrackIndex(
                                                                currentTrackIndex + index
                                                            );

                                                            setCurrentTime(0);

                                                            setHasTrack(true);

                                                            setIsPlaying(true);
                                                        }}
                                                        style={{
                                                            position: "absolute",
                                                            inset: 0,

                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",

                                                            background: "rgba(0,0,0,.20)",

                                                            backdropFilter: "blur(2px)",

                                                            opacity: 0,

                                                            transition: "opacity 180ms ease",

                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        {currentTrack?.id === track.id &&
                                                            isPlaying ? (
                                                            <Pause
                                                                size={12}
                                                                strokeWidth={2}
                                                                fill="#ECECE8"
                                                                color="#ECECE8"
                                                            />
                                                        ) : (
                                                            <Play
                                                                size={12}
                                                                strokeWidth={2}
                                                                fill="#ECECE8"
                                                                color="#ECECE8"
                                                                style={{
                                                                    marginLeft: 1,
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        minWidth: 0,
                                                        flex: 1,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",

                                                            color: theme.colors.text,

                                                            ...theme.typography.body,
                                                        }}
                                                    >
                                                        {track.title}
                                                    </div>

                                                    <div
                                                        style={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",

                                                            color: theme.colors.textSecondary,

                                                            ...theme.typography.smallText,
                                                        }}
                                                    >
                                                        {track.artist}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </GlassSlideout>
                    {player &&
                        React.cloneElement(player, {
                            signedIn,

                            hasTrack,
                            setHasTrack,

                            isPlaying,
                            setIsPlaying,

                            currentTime,
                            setCurrentTime,

                            duration,
                            setDuration,

                            currentTrack,
                            setCurrentTrack,

                            albumQueue,
                            setAlbumQueue,

                            currentTrackIndex,
                            setCurrentTrackIndex,

                            originalAlbumQueue,
                            setOriginalAlbumQueue,

                            audioRef,

                            queueOpen,
                            setQueueOpen,

                            autoplayQueue,
                            setAutoplayQueue,

                            lyricsOpen,
                            setLyricsOpen,

                            expandedPlayerOpen,
                            setExpandedPlayerOpen,

                            repeatOne,
                            setRepeatOne,

                            shuffleOn,
                            setShuffleOn,

                            volume,
                            setVolume,

                            muted,
                            setMuted,

                            previousVolume,
                            setPreviousVolume,
                        })}

                    <ExpandedPlayer
                        open={expandedPlayerOpen}
                        onClose={() => setExpandedPlayerOpen(false)}

                        volume={volume}
                        setVolume={setVolume}

                        muted={muted}
                        setMuted={setMuted}

                        currentTime={currentTime}
                        setCurrentTime={setCurrentTime}

                        duration={duration}

                        currentTrack={currentTrack}
                        setCurrentTrack={setCurrentTrack}

                        albumQueue={albumQueue}
                        setAlbumQueue={setAlbumQueue}

                        queueOpen={queueOpen}
                        setQueueOpen={setQueueOpen}

                        lyricsOpen={lyricsOpen}
                        setLyricsOpen={setLyricsOpen}

                        originalAlbumQueue={originalAlbumQueue}
                        setOriginalAlbumQueue={setOriginalAlbumQueue}

                        currentTrackIndex={currentTrackIndex}
                        setCurrentTrackIndex={setCurrentTrackIndex}

                        audioRef={audioRef}

                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}

                        repeatOne={repeatOne}
                        setRepeatOne={setRepeatOne}

                        shuffleOn={shuffleOn}
                        setShuffleOn={setShuffleOn}

                        hasTrack={hasTrack}
                        setHasTrack={setHasTrack}
                    />
                </div>
            </AppCanvas>
        </AppProvider>
    );
}