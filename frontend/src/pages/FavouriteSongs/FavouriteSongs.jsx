import { useEffect, useState, useRef } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useNavigate } from "react-router-dom";

import GlassMenu from "../../components/glass/GlassMenu";

import { getPlaylists } from "../../services/playlistService";

import {
    toggleFavourite,
    addToLibrary,
    removeFromLibrary,
} from "../../services/userService";

import {
    Play,
    Pause,
    Shuffle,
    Star,
    Plus,
    Minus,
    Ellipsis,
    Square,
    ListPlus,
    ListStart,
    ListEnd,
    HeartPlus,
    Pin,
    UserRound,
    SquareArrowOutUpRight,
} from "lucide-react";

export default function FavouriteSongs() {
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

    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    const [hoveredArtworkId, setHoveredArtworkId] = useState(null);

    // Ellipsis glass menu
    const [openMenuId, setOpenMenuId] = useState(null);

    const [menuPosition, setMenuPosition] = useState({
        top: 0,
        left: 0,
    });

    const menuRef = useRef(null);

    const [selectedSong, setSelectedSong] = useState(null);

    const favouriteColor =
        theme.mode === "dark"
            ? "#cd3328"
            : "#e31515";

    useEffect(() => {
        async function loadPlaylist() {
            try {
                const playlists = await getPlaylists();

                const favouritePlaylist = playlists.find(
                    (playlist) =>
                        playlist.name === "Favourite Songs" &&
                        playlist.isSystem === true
                );

                setPlaylist(favouritePlaylist || null);
            } catch (err) {
                console.error("Unable to load Favourite Songs:", err);
            } finally {
                setLoading(false);
            }
        }

        loadPlaylist();
    }, [user]);

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

                        animation:
                            "favouriteSongsSpinner .8s linear infinite",
                    }}
                />

                <div
                    style={{
                        color: theme.colors.text,

                        ...theme.typography.body,
                    }}
                >
                    Loading Favourite Songs...
                </div>

                <style>
                    {`
                        @keyframes favouriteSongsSpinner {
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

    if (!playlist) {
        return (
            <div
                style={{
                    minHeight: "calc(100vh - 220px)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    color: theme.colors.textSecondary,

                    ...theme.typography.body,
                }}
            >
                No favourite songs yet.
            </div>
        );
    }

    const tracks = playlist.tracks || [];

    const isCurrentTrack = (song) =>
        currentTrack?._id === song?._id;

    const isInLibrary = (song) =>
        user?.library?.some(
            (librarySong) =>
                librarySong?._id === song?._id
        ) ?? false;

    const playPlaylist = () => {
        if (!tracks.length) return;

        setOriginalAlbumQueue(tracks);
        setAlbumQueue(tracks);

        setCurrentTrackIndex(0);

        setCurrentTrack(tracks[0]);

        setCurrentTime(0);

        setHasTrack(true);
        setIsPlaying(true);
    };

    const shufflePlaylist = () => {
        if (!tracks.length) return;

        const shuffled = [...tracks];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [
                shuffled[j],
                shuffled[i],
            ];
        }

        setOriginalAlbumQueue(tracks);
        setAlbumQueue(shuffled);

        setCurrentTrackIndex(0);

        setCurrentTrack(shuffled[0]);

        setCurrentTime(0);

        setHasTrack(true);
        setIsPlaying(true);
    };

    const handleToggleFavourite = async (song) => {
        console.log("FAVOURITE STAR CLICKED");
        console.log("SONG:", song);
        console.log("SONG ID:", song?._id);
        console.log("USER:", user);

        if (!song || !user) {
            console.log("Missing song or user");
            return;
        }

        try {
            console.log("Calling toggleFavourite...");

            const data = await toggleFavourite(song);

            console.log("toggleFavourite response:", data);

            setUser(data.user);

            setPlaylist((currentPlaylist) => {
                if (!currentPlaylist) return currentPlaylist;

                return {
                    ...currentPlaylist,

                    tracks: (currentPlaylist.tracks || []).filter(
                        (track) => track._id !== song._id
                    ),
                };
            });
        } catch (err) {
            console.error("Unable to update favourite:", err);
        }
    };

    const handleToggleLibrary = async (song) => {
        if (!song || !user) return;

        try {
            const alreadyInLibrary = isInLibrary(song);

            const data = alreadyInLibrary
                ? await removeFromLibrary(song)
                : await addToLibrary(song);

            setUser(data.user);
        } catch (err) {
            console.error(
                "Unable to update library:",
                err
            );
        }
    };

    const menuItems = [
        {
            label:
                currentTrack?.id === selectedSong?.id && isPlaying
                    ? "Stop Playing"
                    : "Play Song",

            icon:
                currentTrack?.id === selectedSong?.id && isPlaying ? (
                    <Square size={14} strokeWidth={1.7} />
                ) : (
                    <Play size={14} strokeWidth={1.7} />
                ),

            onClick: () => {
                if (!selectedSong) return;

                const isCurrentSong =
                    currentTrack?.id === selectedSong.id;

                if (isCurrentSong && isPlaying) {
                    setIsPlaying(false);
                    setHasTrack(false);
                    setCurrentTime(0);
                    setCurrentTrack(null);
                } else {
                    const index = tracks.findIndex(
                        (track) => track._id === selectedSong._id
                    );

                    if (index !== -1) {
                        setCurrentTrackIndex(index);
                    }

                    setOriginalAlbumQueue(tracks);
                    setAlbumQueue(tracks);

                    setCurrentTrack(selectedSong);

                    setCurrentTime(0);
                    setHasTrack(true);
                    setIsPlaying(true);
                }

                setOpenMenuId(null);
                setSelectedSong(null);
            },
        },

        "divider",

        {
            label:
                selectedSong && isInLibrary(selectedSong)
                    ? "Remove from Library"
                    : "Add to Library",

            icon:
                selectedSong && isInLibrary(selectedSong) ? (
                    <Minus
                        size={15}
                        strokeWidth={1.75}
                    />
                ) : (
                    <Plus
                        size={15}
                        strokeWidth={1.75}
                    />
                ),

            onClick: async () => {
                if (!selectedSong) return;

                await handleToggleLibrary(selectedSong);

                setOpenMenuId(null);
                setSelectedSong(null);
            },
        },

        {
            label: "Add to Playlist",

            icon: <ListPlus size={15} strokeWidth={1.75} />,

            onClick: () => {
                // wire later
            },
        },

        {
            label: "Unfavourite",

            icon: <Star size={15} strokeWidth={1.75} />,

            onClick: async () => {
                if (!selectedSong) return;

                await handleToggleFavourite(selectedSong);

                setOpenMenuId(null);
                setSelectedSong(null);
            },
        },

        {
            label: "Pin Song",

            icon: <Pin size={15} strokeWidth={1.75} />,

            onClick: () => {
                // wire later
            },
        },

        "divider",

        {
            label: "Play Next",

            icon: <ListStart size={15} strokeWidth={1.75} />,

            onClick: () => {
                if (!selectedSong || !currentTrack) return;

                const queue = albumQueue.filter(
                    (track) => track.id !== selectedSong.id
                );

                const currentIndex = queue.findIndex(
                    (track) => track.id === currentTrack.id
                );

                queue.splice(currentIndex + 1, 0, selectedSong);

                setAlbumQueue(queue);

                setCurrentTrackIndex(currentIndex);

                setOpenMenuId(null);
                setSelectedSong(null);
            },
        },

        {
            label: "Add to Queue",

            icon: <ListEnd size={15} strokeWidth={1.75} />,

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

            icon: <HeartPlus size={15} strokeWidth={1.75} />,

            onClick: () => {
                // wire later
            },
        },

        "divider",

        {
            label: "Go to Album",

            icon: <SquareArrowOutUpRight size={15} strokeWidth={1.75} />,

            onClick: () => {
                if (!selectedSong?.albumId) return;

                setOpenMenuId(null);
                setSelectedSong(null);

                navigate(`/album/${selectedSong.albumId}`);
            },
        },

        {
            label: "Go to Artist",

            icon: <UserRound size={15} strokeWidth={1.75} />,

            onClick: () => {
                if (!selectedSong?.artistId) return;

                setOpenMenuId(null);
                setSelectedSong(null);

                navigate(`/artist/${selectedSong.artistId}`);
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
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    gap: 42,

                    alignItems: "flex-start",

                    marginBottom: 70,
                }}
            >
                {/* Favourite Songs Tile */}
                <div
                    style={{
                        position: "relative",

                        width: 340,
                        aspectRatio: "1",

                        flexShrink: 0,

                        borderRadius: 34,

                        overflow: "hidden",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

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
                    <Star
                        size={72}
                        strokeWidth={1.25}
                        color={favouriteColor}
                        fill={favouriteColor}
                    />
                </div>

                {/* Playlist Info */}
                <div
                    style={{
                        flex: 1,

                        display: "flex",
                        flexDirection: "column",

                        minWidth: 0,

                        height: 340,
                    }}
                >
                    <h1
                        style={{
                            margin: 0,

                            marginBottom: 12,

                            color: theme.colors.text,

                            ...theme.typography.display,
                        }}
                    >
                        {playlist.name}
                    </h1>

                    <div
                        style={{
                            color: theme.colors.text,

                            marginBottom: 26,

                            ...theme.typography.body,
                        }}
                    >
                        {playlist.description ||
                            "Songs you've added to your favourites."}
                    </div>

                    <div
                        style={{
                            color: theme.colors.textSecondary,

                            marginBottom: 0,

                            ...theme.typography.smallText,
                        }}
                    >
                        {tracks.length}{" "}
                        {tracks.length === 1 ? "song" : "songs"}
                    </div>

                    {/* Buttons */}
                    <div
                        style={{
                            display: "flex",

                            gap: 12,

                            marginTop: "auto",

                            justifyContent: "flex-start",
                        }}
                    >
                        {/* Play */}
                        <button
                            onClick={playPlaylist}
                            disabled={!tracks.length}
                            style={{
                                width: 180,
                                height: 38,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                gap: 10,

                                border: "none",
                                outline: "none",

                                cursor: tracks.length
                                    ? "pointer"
                                    : "default",

                                borderRadius: 9999,

                                background:
                                    theme.mode === "dark"
                                        ? "#cd3328"
                                        : "#e31515",

                                color:
                                    theme.mode === "dark"
                                        ? theme.colors.text
                                        : "#ecece8",

                                opacity: tracks.length ? 1 : 0.45,

                                transition: "all 220ms ease",

                                ...theme.typography.buttonSecondary,
                            }}
                            onMouseEnter={(e) => {
                                if (tracks.length) {
                                    e.currentTarget.style.transform =
                                        "translateY(-1px)";
                                }
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
                            onClick={shufflePlaylist}
                            disabled={!tracks.length}
                            style={{
                                width: 180,
                                height: 38,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                gap: 10,

                                border: "none",
                                outline: "none",

                                cursor: tracks.length
                                    ? "pointer"
                                    : "default",

                                borderRadius: 9999,

                                background:
                                    theme.mode === "dark"
                                        ? "rgba(50,50,50,.08)"
                                        : "rgba(255,255,255,.08)",

                                color: theme.colors.text,

                                opacity: tracks.length ? 1 : 0.45,

                                transition: "all 220ms ease",

                                ...theme.typography.buttonSecondary,
                            }}
                            onMouseEnter={(e) => {
                                if (tracks.length) {
                                    e.currentTarget.style.transform =
                                        "translateY(-1px)";
                                }
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

            {/* Empty state */}
            {!tracks.length ? (
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
                    No favourite songs yet.
                </div>
            ) : (
                <>
                    {/* Songs Header */}
                    <div
                        style={{
                            display: "grid",

                            gridTemplateColumns:
                                "24px 36px 40px minmax(0,1fr) 220px 80px 36px 36px",

                            alignItems: "center",

                            padding: "0 18px 18px",

                            color: theme.colors.textSecondary,

                            ...theme.typography.smallText,
                        }}
                    >
                        <div />
                        <div
                            style={{
                                transform: "translateX(-24px)",
                            }}
                        >
                            #
                        </div>
                        <div />
                        <div
                            style={{
                                transform: "translateX(-30px)",
                            }}
                        >
                            Title
                        </div>
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
                        {tracks.map((song, index) => (
                            <div
                                key={song._id}
                                style={{
                                    position: "relative",

                                    display: "grid",

                                    gridTemplateColumns:
                                        "24px 36px 40px minmax(0,1fr) 220px 80px 36px 36px",

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

                                    e.currentTarget.style.marginLeft = "-18px";
                                    e.currentTarget.style.marginRight = "-18px";
                                    e.currentTarget.style.paddingLeft = "36px";
                                    e.currentTarget.style.paddingRight = "36px";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";

                                    e.currentTarget.style.marginLeft = "0";
                                    e.currentTarget.style.marginRight = "0";
                                    e.currentTarget.style.paddingLeft = "18px";
                                    e.currentTarget.style.paddingRight = "18px";
                                }}
                            >
                                {/* Favourite */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        handleToggleFavourite(song);
                                    }}
                                >
                                    <Star
                                        size={13}
                                        strokeWidth={1.5}
                                        color={favouriteColor}
                                        fill={favouriteColor}
                                        style={{
                                            cursor: "pointer",

                                            transform: "translateX(-35px)",
                                        }}
                                    />
                                </div>

                                {/* Number */}
                                <div
                                    style={{
                                        position: "relative",

                                        width: 24,
                                        height: 24,

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        transform: "translateX(-28px)",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: theme.colors.textSecondary,

                                            ...theme.typography.smallText,
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                </div>

                                {/* Artwork */}
                                <div
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

                                        setOriginalAlbumQueue(tracks);
                                        setAlbumQueue(tracks);

                                        setCurrentTrackIndex(index);

                                        console.log("FAVOURITE SONG BEING PLAYED:", song);
                                        console.log("PREVIEW URL:", song?.preview);

                                        setCurrentTrack(song);

                                        setCurrentTime(0);

                                        setHasTrack(true);
                                        setIsPlaying(true);
                                    }}
                                    style={{
                                        position: "relative",

                                        width: 34,
                                        height: 34,

                                        borderRadius: 7,

                                        overflow: "hidden",

                                        flexShrink: 0,

                                        background:
                                            theme.mode === "dark"
                                                ? "rgba(255,255,255,.05)"
                                                : "rgba(0,0,0,.035)",

                                        backgroundImage: song.artwork
                                            ? `url(${song.artwork})`
                                            : "none",

                                        backgroundSize: "cover",
                                        backgroundPosition: "center",

                                        transform: "translateX(-34px)",

                                        cursor: "pointer",
                                    }}
                                >
                                    {/* Dark / blur overlay */}
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

                                    {/* Control */}
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
                                                /* CURRENT SONG + HOVER = PAUSE */
                                                <Pause
                                                    size={14}
                                                    strokeWidth={1.7}
                                                    fill="#ECECE8"
                                                    color="#ECECE8"
                                                />
                                            ) : (
                                                /* CURRENT SONG + NOT HOVERED = AUDIO BARS */
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "flex-end",
                                                        justifyContent: "center",

                                                        gap: 2,

                                                        width: 14,
                                                        height: 14,
                                                    }}
                                                >
                                                    <span className="favourite-audio-bar favourite-bar-1" />
                                                    <span className="favourite-audio-bar favourite-bar-2" />
                                                    <span className="favourite-audio-bar favourite-bar-3" />
                                                </div>
                                            )
                                        ) : (
                                            /* EVERY OTHER SONG = PLAY ONLY ON HOVER */
                                            <Play
                                                size={14}
                                                strokeWidth={1.7}
                                                fill="#ECECE8"
                                                color="#ECECE8"
                                                style={{
                                                    opacity:
                                                        hoveredArtworkId === song._id
                                                            ? 1
                                                            : 0,

                                                    transition: "opacity 180ms ease",
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

                                        transform: "translateX(-30px)",
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

                                {/* Add to Library */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        cursor: isInLibrary(song)
                                            ? "default"
                                            : "pointer",

                                        opacity: isInLibrary(song)
                                            ? 0
                                            : 1,

                                        pointerEvents: isInLibrary(song)
                                            ? "none"
                                            : "auto",

                                        transition:
                                            "opacity 180ms ease, transform 180ms ease",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        handleToggleLibrary(song);
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isInLibrary(song)) {
                                            e.currentTarget.style.transform =
                                                "translateY(-1px)";
                                        }
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

                                        onClick={(e) => {
                                            e.stopPropagation();

                                            const rect =
                                                e.currentTarget.getBoundingClientRect();

                                            const MENU_HEIGHT = 355;
                                            const GAP = 33;

                                            if (openMenuId === song._id) {
                                                setSelectedSong(null);
                                                setOpenMenuId(null);

                                                return;
                                            }

                                            setMenuPosition({
                                                left: rect.left - 170,
                                                top: rect.top - MENU_HEIGHT - GAP,
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
        .favourite-audio-bar {
            width: 2px;
            border-radius: 999px;

            background: currentColor;

            color: #ECECE8;

            transform-origin: bottom center;

            animation: favouriteAudio 900ms ease-in-out infinite;
        }

        .favourite-bar-1 {
            animation-delay: 0ms;
        }

        .favourite-bar-2 {
            animation-delay: 180ms;
        }

        .favourite-bar-3 {
            animation-delay: 360ms;
        }

        @keyframes favouriteAudio {
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