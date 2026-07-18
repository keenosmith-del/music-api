//
import { Outlet } from "react-router-dom";

import { AppProvider } from "../../context/AppContext";

import AppCanvas from "./AppCanvas";

import ThemeToggle from "../common/ThemeToggle";

import { useTheme } from "../../context/ThemeContext";

import { useState } from "react";

import React from "react";

import musicIcon from "../../assets/svgs/music-thin.svg";

import GlassSlideout from "../glass/GlassSlideout";
import ExpandedPlayer from "../player/ExpandedPlayer";

import {
    AudioLines,
    UserRound,
    Music,
    Play,
    Star,
} from "lucide-react";

export default function AppLayout({
    sidebar,
    children,
    player,
}) {
    // STATES 
    const { theme } = useTheme();

    const dark = theme.mode === "dark";

    // temp;; const signedIn = !!user;
    const [signedIn, setSignedIn] = useState(false);

    // slideout music in queue
    // slideout lyrics
    const [queueOpen, setQueueOpen] = useState(false);
    const [lyricsOpen, setLyricsOpen] = useState(false);

    // play
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasTrack, setHasTrack] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);

    // 3:42 = 222 seconds
    const [duration, setDuration] = useState(222);

    // playback state
    const [currentTrack, setCurrentTrack] = useState(null);

    const [albumQueue, setAlbumQueue] = useState([]);

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

    return (
        <AppProvider
            value={{
                signedIn,
                setSignedIn,

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
                    {sidebar && React.cloneElement(sidebar, { signedIn, setSignedIn })}

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
                            albumQueue,

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