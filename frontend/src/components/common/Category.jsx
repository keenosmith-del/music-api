import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getArtist,
    getCategoryArtists,
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

export default function Category() {
    const { theme } = useTheme();

    const navigate = useNavigate();

    const { id } = useParams();

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function loadArtists() {
            try {
                const data = await getCategoryArtists(id);

                setArtists(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadArtists();
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

    const favouriteColor =
        theme.mode === "dark"
            ? "#cd3328"
            : "#e31515";

    const categories = [
        {
            title: "Rock",
            query: "rock",
            artwork: rockImage,
        },
        {
            title: "Hits",
            query: "hits",
            artwork: hitsImage,
        },
        {
            title: "Concert",
            query: "concert",
            artwork: concertImage,
        },
        {
            title: "Chill",
            query: "chill",
            artwork: chillImage,
        },
        {
            title: "Charts",
            query: "charts",
            artwork: chartsImage,
        },
        {
            title: "Hip Hop",
            query: "hiphop",
            artwork: hipHopImage,
        },

        {
            title: "Live",
            query: "live",
            artwork: liveImage,
        },
        {
            title: "R&B",
            query: "rnb",
            artwork: rnbImage,
        },
        // {
        //     title: "Pop",
        //     query: "pop",
        //     artwork: popImage,
        // },
        {
            title: "Gospel",
            query: "gospel",
            artwork: gospelImage,
        },
        {
            title: "Dance",
            query: "dance",
            artwork: danceImage,
        },
        {
            title: "Alternative",
            query: "alternative",
            artwork: alternativeImage,
        },

        {
            title: "2010s",
            query: "2010s",
            artwork: era2010sImage,
        },
        {
            title: "'80s",
            query: "80s",
            artwork: era80sImage,
        },
        {
            title: "'70s",
            query: "70s",
            artwork: era70sImage,
        },
        {
            title: "Jazz",
            query: "jazz",
            artwork: jazzImage,
        },
        {
            title: "Country",
            query: "country",
            artwork: countryImage,
        },
        {
            title: "Essentials",
            query: "essentials",
            artwork: essentialsImage,
        },

        {
            title: "Chill",
            query: "chill",
            artwork: chillImage,
        },
        {
            title: "Focus",
            query: "focus",
            artwork: focusImage,
        },
        {
            title: "Feel Good",
            query: "feelgood",
            artwork: feelGoodImage,
        },

        {
            title: "Love",
            query: "love",
            artwork: loveImage,
        },
        {
            title: "Party",
            query: "party",
            artwork: partyImage,
        },
        {
            title: "Soul/Funk",
            query: "soulfunk",
            artwork: soulImage,
        },
        {
            title: "Oldies",
            query: "oldies",
            artwork: oldiesImage,
        },
        {
            title: "Reggae",
            query: "reggae",
            artwork: reggaeImage,
        },
        {
            title: "Rap",
            query: "rap",
            artwork: rapImage,
        },
    ];

    const category = categories.find(
        (item) => item.query === id
    );

    console.log("Category first artist:", artists[0]);

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

            </div>

            {/* ---------- artists in Category ---------- */}

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
                    Artists
                </h2>

                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(340px, 1fr))",

                        gap: 32,
                    }}
                >
                    {artists.map(({ id, name, artwork }) => (
                        <div
                            key={id}
                            onClick={() => navigate(`/artist/${id}`)}
                            style={{
                                width: "100%",

                                display: "flex",
                                flexDirection: "column",

                                gap: 14,

                                cursor: "pointer",
                            }}
                        >
                            {/* Artwork */}
                            <div
                                style={{
                                    position: "relative",

                                    aspectRatio: "1.12",

                                    borderRadius: 26,

                                    overflow: "hidden",

                                    backgroundImage: artwork
                                        ? `url(${artwork})`
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
                                        play.style.transform =
                                            "translateY(0) scale(1)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const play =
                                        e.currentTarget.querySelector(".tile-play-button");

                                    if (play) {
                                        play.style.opacity = "0";
                                        play.style.transform =
                                            "translateY(6px) scale(.92)";
                                    }
                                }}
                            >
                                {/* Overlay */}
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

                                {/* Play button */}
                                <div
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const tracks = await getArtist(name);

                                            if (!tracks.length) return;

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
                                    className="tile-play-button"
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

                            {/* Artist name */}
                            <div
                                style={{
                                    color: theme.colors.text,

                                    ...theme.typography.body,
                                }}
                            >
                                {name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}