import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getArtistInfo,
    getAlbum,
    getArtist,
} from "../../services/musicService";

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

export default function Artist() {
    const { theme } = useTheme();

    const navigate = useNavigate();

    const { id } = useParams();

    const [artist, setArtist] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadArtist() {
            try {
                const data = await getArtistInfo(id);

                setArtist(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadArtist();
    }, [id]);

    const albumYears = Object.values(
        (artist?.albums || []).reduce((groups, album) => {
            const year = album.year || "Unknown";

            if (!groups[year]) {
                groups[year] = {
                    year,
                    albums: [],
                };
            }

            groups[year].albums.push(album);

            return groups;
        }, {})
    ).sort((a, b) => Number(b.year) - Number(a.year));

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


    const favouriteColor =
        theme.mode === "dark"
            ? "#cd3328"
            : "#e31515";


    const isCurrentTrack = (song) =>
        currentTrack?.id === song.id;

    const latestAlbum = artist?.latestAlbum;

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
                Loading artist...
            </div>
        );
    }

    if (!artist || !latestAlbum) {
        return null;
    }

    const latestSongs = artist?.latestSongs || [];

    return (
        <div
            style={{
                padding: "40px",
                paddingBottom: "220px",
            }}
        >
            {/* TOP */}
            <div
                style={{
                    display: "flex",
                    gap: 42,
                    alignItems: "flex-start",
                    marginBottom: 70,
                }}
            >
                {/* Artist Banner */}
                <div
                    style={{
                        position: "relative",

                        width: "100%",
                        height: 380,

                        borderRadius: 34,

                        overflow: "hidden",

                        background:
                            theme.mode === "dark"
                                ? "rgba(30,30,30,.10)"
                                : "rgba(255,255,255,.55)",

                        boxShadow:
                            theme.mode === "dark"
                                ? "0 12px 28px rgba(0,0,0,.30)"
                                : `
                    0 12px 28px rgba(0,0,0,.08),
                    inset 0 1px 0 rgba(255,255,255,.95)
                `,
                    }}
                    onMouseEnter={(e) => {
                        const play =
                            e.currentTarget.querySelector(".artist-play-button");

                        if (play) {
                            play.style.opacity = "1";
                            play.style.transform = "scale(1)";
                        }
                    }}

                    onMouseLeave={(e) => {
                        const play =
                            e.currentTarget.querySelector(".artist-play-button");

                        if (play) {
                            play.style.opacity = "0";
                            play.style.transform = "scale(.9)";
                        }
                    }}
                >
                    {/* Artist artwork*/}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,

                            backgroundImage: artist?.artwork
                                ? `url(${artist.artwork})`
                                : "none",

                            backgroundSize: "cover",
                            backgroundPosition: "center 20%", // bring artwork down
                            backgroundRepeat: "no-repeat",
                        }}
                    />

                    {/* Gradient */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,

                            background:
                                "linear-gradient(to top, rgba(0,0,0,.70), rgba(0,0,0,.08))",
                        }}
                    />

                    {/* Name */}
                    <div
                        style={{
                            position: "absolute",

                            left: 48,
                            bottom: 42,

                            display: "flex",
                            alignItems: "center",

                            gap: 18,
                        }}
                    >
                        {/* Play button */}

                        <div
                            onClick={async (e) => {
                                e.stopPropagation();

                                if (!artist) return;

                                try {
                                    const tracks = await getArtist(artist.name);

                                    setOriginalAlbumQueue(tracks);

                                    setAlbumQueue(tracks);

                                    setCurrentTrackIndex(0);

                                    setCurrentTrack(tracks[0]);

                                    setCurrentTime(0);

                                    setHasTrack(true);

                                    setIsPlaying(true);
                                } catch (err) {
                                    console.error(err);
                                }
                            }}
                            className="artist-play-button"
                            style={{
                                width: 48,
                                height: 48,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                borderRadius: "50%",

                                opacity: 0,

                                transform: "scale(.9)",

                                transition: "all 220ms ease",

                                background:
                                    theme.mode === "dark"
                                        ? "rgba(13,13,13,.08)"
                                        : "rgba(255,255,255,.22)",

                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",

                                cursor: "pointer",
                            }}
                        >
                            <Play
                                size={20}
                                fill={theme.colors.text}
                                color={theme.colors.text}
                                style={{
                                    marginLeft: 2,
                                }}
                            />
                        </div>

                        <h1
                            style={{
                                margin: 0,

                                color: "#ECECE8",

                                ...theme.typography.display,
                            }}
                        >
                            {artist?.name}
                        </h1>
                    </div>
                </div>

            </div>

            {/* ---------- Latest Album ---------- */}

            <div
                style={{
                    marginBottom: 54,
                }}
            >
                <h2
                    style={{
                        color: theme.colors.text,
                        marginBottom: 18,
                        ...theme.typography.rowHeading,
                    }}
                >
                    Latest Album
                </h2>

                <div
                    onClick={() => navigate(`/album/${latestAlbum.id}`)}
                    style={{
                        width: 320,

                        display: "flex",
                        flexDirection: "column",

                        gap: 14,

                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            position: "relative",

                            aspectRatio: "1",

                            borderRadius: 26,

                            overflow: "hidden",

                            backgroundImage: latestAlbum?.artwork
                                ? `url(${latestAlbum.artwork})`
                                : "none",

                            backgroundSize: "cover",

                            backgroundPosition: "center",

                            backgroundRepeat: "no-repeat",

                            backgroundColor:
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
                            onClick={async (e) => {
                                e.stopPropagation();

                                try {
                                    const album = await getAlbum(latestAlbum.id);

                                    setOriginalAlbumQueue(album.tracks);

                                    setAlbumQueue(album.tracks);

                                    setCurrentTrackIndex(0);

                                    setCurrentTrack(album.tracks[0]);

                                    setCurrentTime(0);

                                    setHasTrack(true);

                                    setIsPlaying(true);
                                } catch (err) {
                                    console.error(err);
                                }
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
                            {latestAlbum?.title}
                        </div>

                        {latestAlbum.explicit && (
                            <div
                                style={{
                                    width: 14,
                                    height: 14,

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    borderRadius: 3,

                                    background:
                                        theme.mode === "dark"
                                            ? "rgba(255,255,255,.10)"
                                            : "rgba(0,0,0,.10)",

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
                            fill={favouriteColor}
                        />
                    </div>

                    <div
                        style={{
                            color: theme.colors.textSecondary,
                            ...theme.typography.smallText,
                        }}
                    >
                        {latestAlbum?.year}
                    </div>
                </div>
            </div>

            {/* ---------- Latest Songs ---------- */}

            <div
                style={{
                    marginBottom: 54,
                }}
            >
                <h2
                    style={{
                        color: theme.colors.text,
                        marginBottom: 18,
                        ...theme.typography.rowHeading,
                    }}
                >
                    Latest Songs
                </h2>

                <div
                    style={{
                        display: "flex",
                        gap: 24,

                        overflowX: "auto",

                        paddingLeft: 20,
                        paddingBottom: 8,

                        scrollbarWidth: "none",
                    }}
                >
                    {latestSongs.map((song) => (
                        <div
                            key={song.id}
                            onClick={() => navigate(`/album/${song.albumId}`)}
                            style={{
                                width: 220,
                                flexShrink: 0,

                                display: "flex",
                                flexDirection: "column",

                                gap: 14,
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",

                                    aspectRatio: "1",

                                    borderRadius: 26,

                                    overflow: "hidden",

                                    backgroundImage: song.artwork
                                        ? `url(${song.artwork})`
                                        : "none",

                                    backgroundSize: "cover",

                                    backgroundPosition: "center",

                                    backgroundRepeat: "no-repeat",

                                    backgroundColor:
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
                                onMouseEnter={(e) => {
                                    const play =
                                        e.currentTarget.querySelector(".tile-play-button");

                                    if (play) {
                                        play.style.opacity = "1";
                                        play.style.transform = "translateY(0) scale(1)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const play =
                                        e.currentTarget.querySelector(".tile-play-button");

                                    if (play) {
                                        play.style.opacity = "0";
                                        play.style.transform = "translateY(6px) scale(.92)";
                                    }
                                }}
                            >
                                {/* Overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,

                                        background:
                                            theme.mode === "dark"
                                                ? "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.08))"
                                                : "linear-gradient(to top, rgba(255,255,255,.15), rgba(255,255,255,.05))",

                                        pointerEvents: "none",
                                    }}
                                />

                                {/* Play Button */}
                                <div
                                    className="tile-play-button"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setOriginalAlbumQueue(latestSongs);

                                        setAlbumQueue(latestSongs);

                                        const index = latestSongs.findIndex(
                                            (track) => track.id === song.id
                                        );

                                        setCurrentTrackIndex(index);

                                        setCurrentTrack(song);

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
                                                ? "rgba(13,13,13,.06)"
                                                : "rgba(255,255,255,.07)",

                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",

                                        boxShadow:
                                            theme.mode === "dark"
                                                ? "0 8px 18px rgba(0,0,0,.35)"
                                                : "0 8px 18px rgba(0,0,0,.35)",

                                        cursor: "pointer",
                                    }}
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

                            {/* Title */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,

                                        minWidth: 0,

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
                                            lineHeight: 1,

                                            userSelect: "none",
                                        }}
                                    >
                                        E
                                    </div>
                                )}

                                <Star
                                    size={13}
                                    strokeWidth={1.5}
                                    color={favouriteColor}
                                    fill="none"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                />
                            </div>

                            {/* Subtitle */}
                            <div
                                style={{
                                    color: theme.colors.textSecondary,

                                    ...theme.typography.smallText,
                                }}
                            >
                                {song.album}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ---------- Albums ---------- */}

            <h2
                style={{
                    color: theme.colors.text,
                    marginBottom: 30,
                    ...theme.typography.rowHeading,
                }}
            >
                Albums
            </h2>

            {albumYears.map((group) => (
                <div
                    key={group.year}
                    style={{
                        marginBottom: 54,
                    }}
                >
                    <h3
                        style={{
                            color: theme.colors.text,
                            marginBottom: 18,
                            ...theme.typography.body,
                        }}
                    >
                        {group.year}
                    </h3>

                    <div
                        style={{
                            display: "flex",
                            gap: 24,

                            overflowX: "auto",

                            paddingLeft: 20,
                            paddingBottom: 8,

                            scrollbarWidth: "none",
                        }}
                    >
                        {group.albums.map((album) => (
                            <div
                                key={album.id}
                                style={{
                                    width: 280,
                                    flexShrink: 0,

                                    display: "flex",
                                    flexDirection: "column",

                                    gap: 14,
                                }}
                            >
                                <div
                                    onClick={() => navigate(`/album/${album.id}`)}
                                    style={{
                                        position: "relative",

                                        aspectRatio: "1",

                                        borderRadius: 26,

                                        overflow: "hidden",

                                        cursor: "pointer",

                                        backgroundImage: album.artwork
                                            ? `url(${album.artwork})`
                                            : "none",

                                        backgroundSize: "cover",

                                        backgroundPosition: "center",

                                        backgroundRepeat: "no-repeat",

                                        backgroundColor:
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
                                    onMouseEnter={(e) => {
                                        const play =
                                            e.currentTarget.querySelector(".tile-play-button");

                                        if (play) {
                                            play.style.opacity = "1";
                                            play.style.transform = "translateY(0) scale(1)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        const play =
                                            e.currentTarget.querySelector(".tile-play-button");

                                        if (play) {
                                            play.style.opacity = "0";
                                            play.style.transform = "translateY(6px) scale(.92)";
                                        }
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,

                                            background:
                                                theme.mode === "dark"
                                                    ? "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.08))"
                                                    : "linear-gradient(to top, rgba(255,255,255,.15), rgba(255,255,255,.05))",

                                            pointerEvents: "none",
                                        }}
                                    />

                                    <div
                                        className="tile-play-button"
                                        onClick={async (e) => {
                                            e.stopPropagation();

                                            const loadedAlbum = await getAlbum(album.id);

                                            setOriginalAlbumQueue(loadedAlbum.tracks);

                                            setAlbumQueue(loadedAlbum.tracks);

                                            setCurrentTrackIndex(0);

                                            setCurrentTrack(loadedAlbum.tracks[0]);

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
                                                    ? "rgba(13,13,13,.06)"
                                                    : "rgba(255,255,255,.07)",

                                            backdropFilter: "blur(16px)",
                                            WebkitBackdropFilter: "blur(16px)",
                                        }}
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
                                        {album.title}
                                    </div>

                                    {album.explicit && (
                                        <div
                                            style={{
                                                width: 14,
                                                height: 14,

                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",

                                                borderRadius: 3,

                                                background:
                                                    theme.mode === "dark"
                                                        ? "rgba(255,255,255,.10)"
                                                        : "rgba(0,0,0,.10)",

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
                                        fill="none"
                                    />
                                </div>

                                <div
                                    style={{
                                        color: theme.colors.textSecondary,
                                        ...theme.typography.smallText,
                                    }}
                                >
                                    {group.year}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    );
}