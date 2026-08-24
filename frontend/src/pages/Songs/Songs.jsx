import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import GlassMenu from "../../components/glass/GlassMenu";

import {
    toggleFavourite,
    removeFromLibrary,
} from "../../services/userService";

import {
    Play,
    Pause,
    Star,
    Ellipsis,
    Minus,
    Plus,
    Square,
    ListPlus,
    ListStart,
    ListEnd,
    HeartPlus,
    Pin,
    UserRound,
    SquareArrowOutUpRight,
} from "lucide-react";

export default function Songs() {
    const { theme } = useTheme();

    const navigate = useNavigate();

    const {
        user,
        setUser,

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

    const favouriteColor =
        theme.mode === "dark"
            ? "#cd3328"
            : "#e31515";

    const songs = user?.library || [];

    const [hoveredArtworkId, setHoveredArtworkId] = useState(null);

    // Ellipsis glass menu
    const [openMenuId, setOpenMenuId] = useState(null);

    const [menuPosition, setMenuPosition] = useState({
        top: 0,
        left: 0,
    });

    useEffect(() => {
        function handleOutsideClick(e) {
            if (
                menuRef.current &&
                menuRef.current.contains(e.target)
            ) {
                return;
            }

            setSelectedSong(null);
            setOpenMenuId(null);
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    useEffect(() => {
        if (openMenuId !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [openMenuId]);

    const menuRef = useRef(null);

    const [selectedSong, setSelectedSong] = useState(null);

    const isCurrentTrack = (song) =>
        currentTrack?._id === song?._id;

    const isFavourite = (song) =>
        user?.favourites?.some(
            (favourite) =>
                favourite?._id === song?._id
        ) ?? false;

    const formatDuration = (duration) => {
        if (!duration && duration !== 0) {
            return "--:--";
        }

        return `${Math.floor(duration / 60)}:${String(
            duration % 60
        ).padStart(2, "0")}`;
    };

    const handleToggleFavourite = async (song) => {
        if (!song || !user) return;

        try {
            const data = await toggleFavourite(song);

            // Keep the global user state in sync.
            // We need setUser from AppContext for this.
            // This will be added to the context destructuring below.

            setUser(data.user);
        } catch (err) {
            console.error("Unable to update favourite:", err);
        }
    };

    const handleRemoveFromLibrary = async (song) => {
        if (!song || !user) return;

        try {
            const data = await removeFromLibrary(song);

            // Update global user state.
            setUser(data.user);

            // Close the menu if it was opened from there.
            setOpenMenuId(null);
            setSelectedSong(null);
        } catch (err) {
            console.error(
                "Unable to remove song from library:",
                err
            );
        }
    };

    const playSelectedSong = () => {
        if (!selectedSong) return;

        const index = songs.findIndex(
            (song) => song._id === selectedSong._id
        );

        if (index === -1) return;

        if (
            currentTrack?._id === selectedSong._id &&
            isPlaying
        ) {
            setIsPlaying(false);
        } else {
            setOriginalAlbumQueue(songs);
            setAlbumQueue(songs);

            setCurrentTrackIndex(index);

            setCurrentTrack(selectedSong);

            setCurrentTime(0);

            setHasTrack(true);
            setIsPlaying(true);
        }

        setOpenMenuId(null);
        setSelectedSong(null);
    };

    const menuItems = [
        {
            label:
                currentTrack?._id === selectedSong?._id &&
                    isPlaying
                    ? "Stop Playing"
                    : "Play Song",

            icon:
                currentTrack?._id === selectedSong?._id &&
                    isPlaying ? (
                    <Square
                        size={14}
                        strokeWidth={1.7}
                    />
                ) : (
                    <Play
                        size={14}
                        strokeWidth={1.7}
                    />
                ),

            onClick: playSelectedSong,
        },

        "divider",

        {
            label: "Remove from Library",

            icon: (
                <Minus
                    size={15}
                    strokeWidth={1.75}
                />
            ),

            onClick: async () => {
                if (!selectedSong) return;

                await handleRemoveFromLibrary(selectedSong);
            },
        },

        {
            label: "Add to Playlist",

            icon: (
                <ListPlus
                    size={15}
                    strokeWidth={1.75}
                />
            ),

            onClick: () => {
                // Wire later.
            },
        },

        {
            label:
                selectedSong &&
                    isFavourite(selectedSong)
                    ? "Unfavourite"
                    : "Favourite",

            icon: (
                <Star
                    size={15}
                    strokeWidth={1.75}
                />
            ),

            onClick: async () => {
                if (!selectedSong) return;

                await handleToggleFavourite(
                    selectedSong
                );

                setOpenMenuId(null);
                setSelectedSong(null);
            },
        },

        {
            label: "Pin Song",

            icon: (
                <Pin
                    size={15}
                    strokeWidth={1.75}
                />
            ),

            onClick: () => {
                // Wire later.
            },
        },

        "divider",

        {
            label: "Play Next",

            icon: (
                <ListStart
                    size={15}
                    strokeWidth={1.75}
                />
            ),

            onClick: () => {
                if (!selectedSong) return;

                // If nothing is playing, just play the song.
                if (!currentTrack) {
                    playSelectedSong();
                    return;
                }

                const queue = albumQueue.filter(
                    (track) =>
                        track._id !== selectedSong._id
                );

                const currentIndex = queue.findIndex(
                    (track) =>
                        track._id === currentTrack._id
                );

                if (currentIndex === -1) return;

                queue.splice(
                    currentIndex + 1,
                    0,
                    selectedSong
                );

                setAlbumQueue(queue);

                setOpenMenuId(null);
                setSelectedSong(null);
            },
        },

        {
            label: "Add to Queue",

            icon: (
                <ListEnd
                    size={15}
                    strokeWidth={1.75}
                />
            ),

            onClick: () => {
                if (!selectedSong) return;

                setAlbumQueue((queue) => [
                    ...queue,
                    selectedSong,
                ]);

                setOpenMenuId(null);
                setSelectedSong(null);
            },
        },

        {
            label: "Create Station",

            icon: (
                <HeartPlus
                    size={15}
                    strokeWidth={1.75}
                />
            ),

            onClick: () => {
                // Wire later.
            },
        },

        "divider",

        {
            label: "Go to Album",

            icon: (
                <SquareArrowOutUpRight
                    size={15}
                    strokeWidth={1.75}
                />
            ),

            onClick: () => {
                if (!selectedSong?.albumId) return;

                setOpenMenuId(null);
                setSelectedSong(null);

                navigate(
                    `/album/${selectedSong.albumId}`
                );
            },
        },

        {
            label: "Go to Artist",

            icon: (
                <UserRound
                    size={15}
                    strokeWidth={1.75}
                />
            ),

            onClick: () => {
                if (!selectedSong?.artistId) return;

                setOpenMenuId(null);
                setSelectedSong(null);

                navigate(
                    `/artist/${selectedSong.artistId}`
                );
            },
        },
    ];

    return (
        <div
            style={{
                padding: "40px",
                paddingBottom: "220px",
            }}
        >
            {/* Heading */}
            <h2
                style={{
                    color: theme.colors.text,

                    margin: 0,
                    marginBottom: 30,

                    ...theme.typography.rowHeading,
                }}
            >
                Your Songs
            </h2>

            {!songs.length ? (
                <div
                    style={{
                        minHeight: 200,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        color: theme.colors.textSecondary,

                        ...theme.typography.body,
                    }}
                >
                    No songs in your library yet.
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div
                        style={{
                            display: "grid",

                            gridTemplateColumns:
                                "90px minmax(220px, 1fr) 180px 220px 80px 36px 36px",

                            alignItems: "center",

                            padding: "0 18px 16px",

                            color: theme.colors.textSecondary,

                            ...theme.typography.smallText,
                        }}
                    >
                        <div />

                        <div>
                            Title
                        </div>

                        <div>
                            Artist
                        </div>

                        <div>
                            Album
                        </div>

                        <div>
                            Time
                        </div>

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
                        {songs.map((song, index) => (
                            <div
                                key={song._id}
                                style={{
                                    display: "grid",

                                    gridTemplateColumns:
                                        "90px minmax(220px, 1fr) 180px 220px 80px 36px 36px",

                                    alignItems: "center",

                                    minHeight: 72,

                                    padding: "0 18px",

                                    borderRadius: 18,

                                    cursor: "default",

                                    transition:
                                        "background 180ms ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        theme.mode === "dark"
                                            ? "rgba(255,255,255,.04)"
                                            : "rgba(0,0,0,.035)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";
                                }}
                            >
                                {/* Artwork */}
                                <div
                                    style={{
                                        position: "relative",

                                        width: 54,
                                        height: 54,

                                        borderRadius: 14,

                                        overflow: "hidden",

                                        flexShrink: 0,

                                        cursor: "pointer",

                                        background:
                                            theme.mode === "dark"
                                                ? "rgba(31,31,31,.08)"
                                                : "rgba(255,255,255,.55)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 8px 20px rgba(0,0,0,.25)"
                                                : `
                    0 8px 20px rgba(0,0,0,.06),
                    inset 0 1px 0 rgba(255,255,255,.95)
                `,
                                    }}

                                    onMouseEnter={() => {
                                        setHoveredArtworkId(song._id);
                                    }}

                                    onMouseLeave={() => {
                                        setHoveredArtworkId(null);
                                    }}

                                    onClick={(e) => {
                                        e.stopPropagation();

                                        if (isCurrentTrack(song)) {
                                            setIsPlaying((playing) => !playing);
                                            return;
                                        }

                                        setOriginalAlbumQueue(songs);
                                        setAlbumQueue(songs);

                                        setCurrentTrackIndex(index);

                                        console.log("LIBRARY SONG BEING PLAYED:", song);
                                        console.log("PREVIEW URL:", song?.preview);

                                        setCurrentTrack(song);

                                        setCurrentTime(0);

                                        setHasTrack(true);
                                        setIsPlaying(true);
                                    }}
                                >
                                    {/* Artwork Image */}
                                    {song.artwork && (
                                        <img
                                            src={song.artwork}
                                            alt={song.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                objectFit: "cover",

                                                display: "block",
                                            }}
                                        />
                                    )}

                                    {/* Dark / Blur Overlay */}
                                    <div
                                        style={{
                                            position: "absolute",

                                            inset: 0,

                                            background:
                                                theme.mode === "dark"
                                                    ? "rgba(0,0,0,.42)"
                                                    : "rgba(0,0,0,.22)",

                                            backdropFilter: "blur(2px)",
                                            WebkitBackdropFilter: "blur(2px)",

                                            opacity:
                                                hoveredArtworkId === song._id
                                                    ? 1
                                                    : 0,

                                            transition: "opacity 180ms ease",

                                            zIndex: 1,
                                        }}
                                    />

                                    {/* Playback Control */}
                                    <div
                                        style={{
                                            position: "absolute",

                                            inset: 0,

                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",

                                            color: "#ECECE8",

                                            zIndex: 2,
                                        }}
                                    >
                                        {isCurrentTrack(song) && isPlaying ? (
                                            hoveredArtworkId === song._id ? (
                                                /* Currently Playing + Hover = Pause */
                                                <Pause
                                                    size={16}
                                                    strokeWidth={1.7}
                                                    fill="#ECECE8"
                                                    color="#ECECE8"
                                                />
                                            ) : (
                                                /* Currently Playing + Not Hovered = Audio Bars */
                                                <div
                                                    style={{
                                                        display: "flex",

                                                        alignItems: "flex-end",
                                                        justifyContent: "center",

                                                        gap: 2,

                                                        width: 16,
                                                        height: 16,
                                                    }}
                                                >
                                                    <span className="songs-audio-bar songs-bar-1" />
                                                    <span className="songs-audio-bar songs-bar-2" />
                                                    <span className="songs-audio-bar songs-bar-3" />
                                                </div>
                                            )
                                        ) : (
                                            /* Every Other / Paused Song = Play on Hover */
                                            <Play
                                                size={16}
                                                strokeWidth={1.7}
                                                fill="#ECECE8"
                                                color="#ECECE8"
                                                style={{
                                                    opacity:
                                                        hoveredArtworkId === song._id
                                                            ? 1
                                                            : 0,

                                                    transition: "opacity 180ms ease",

                                                    marginLeft: 2,
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Title */}
                                <div
                                    style={{
                                        display: "flex",

                                        alignItems: "center",

                                        gap: 8,

                                        minWidth: 0,

                                        paddingRight: 24,
                                    }}
                                >
                                    <div
                                        style={{
                                            overflow: "hidden",

                                            whiteSpace: "nowrap",

                                            textOverflow:
                                                "ellipsis",

                                            color:
                                                theme.colors.text,

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
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",

                                                flexShrink: 0,

                                                borderRadius: 3,

                                                background:
                                                    theme.mode ===
                                                        "dark"
                                                        ? "rgba(255,255,255,.10)"
                                                        : "rgba(0,0,0,.10)",

                                                color:
                                                    theme.mode ===
                                                        "dark"
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

                                        cursor="pointer"

                                        color={favouriteColor}

                                        fill={
                                            isFavourite(song)
                                                ? favouriteColor
                                                : "none"
                                        }

                                        onClick={async (e) => {
                                            e.stopPropagation();

                                            await handleToggleFavourite(song);
                                        }}
                                    />
                                </div>

                                {/* Artist */}
                                <div
                                    style={{
                                        overflow: "hidden",

                                        whiteSpace: "nowrap",

                                        textOverflow:
                                            "ellipsis",

                                        color:
                                            theme.colors
                                                .textSecondary,

                                        paddingRight: 24,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {song.artist}
                                </div>

                                {/* Album */}
                                <div
                                    style={{
                                        overflow: "hidden",

                                        whiteSpace: "nowrap",

                                        textOverflow:
                                            "ellipsis",

                                        color:
                                            theme.colors
                                                .textSecondary,

                                        paddingRight: 24,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {song.album || "Unknown Album"}
                                </div>

                                {/* Time */}
                                <div
                                    style={{
                                        color: theme.colors.textSecondary,

                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {formatDuration(song.duration)}
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
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        handleRemoveFromLibrary(song);
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
                                    <Minus
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

                                        onClick={(e) => {
                                            e.stopPropagation();

                                            const rect =
                                                e.currentTarget.getBoundingClientRect();

                                            const GAP = 12;

                                            if (openMenuId === song._id) {
                                                setSelectedSong(null);
                                                setOpenMenuId(null);

                                                return;
                                            }

                                            setMenuPosition({
                                                left: rect.left - 170,
                                                top: rect.bottom + GAP,
                                            });

                                            setSelectedSong(song);
                                            setOpenMenuId(song._id);
                                        }}

                                        style={{
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
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* audio bars */}
            <style>
                {`
        .songs-audio-bar {
            width: 2px;

            border-radius: 999px;

            background: currentColor;

            color: #ECECE8;

            transform-origin: bottom center;

            animation: songsAudio 900ms ease-in-out infinite;
        }

        .songs-bar-1 {
            animation-delay: 0ms;
        }

        .songs-bar-2 {
            animation-delay: 180ms;
        }

        .songs-bar-3 {
            animation-delay: 360ms;
        }

        @keyframes songsAudio {
            0% {
                height: 4px;
            }

            25% {
                height: 11px;
            }

            50% {
                height: 6px;
            }

            75% {
                height: 13px;
            }

            100% {
                height: 4px;
            }
        }
    `}
            </style>

            {/* glass menu */}
            <GlassMenu
                ref={menuRef}
                open={openMenuId !== null}
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
                                key={item.label}
                                onClick={() => {
                                    item.onClick?.();
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",

                                    gap: 10,

                                    height: 30,

                                    padding: "0 12px",

                                    borderRadius: 14,

                                    cursor: "pointer",

                                    color:
                                        theme.colors.textSecondary,

                                    transition:
                                        "all 180ms ease",

                                    ...theme.typography.smallText,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-1px)";

                                    e.currentTarget.style.color =
                                        theme.colors.text;

                                    if (
                                        theme.mode === "light"
                                    ) {
                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.65)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.color =
                                        theme.colors.textSecondary;

                                    e.currentTarget.style.background =
                                        "transparent";
                                }}
                            >
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

                                <span>
                                    {item.label}
                                </span>
                            </div>
                        )
                    )}
                </div>
            </GlassMenu>

        </div>
    );
}