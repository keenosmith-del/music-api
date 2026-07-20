import { useNavigate, useLocation } from "react-router-dom";

import GlassPanel from "../glass/GlassPanel";
import { useTheme } from "../../context/ThemeContext";
import avatar from "../../assets/images/avatar.png"
import { useState } from "react";

import GlassModal from "../glass/GlassModal";

import Toast from "../common/Toast";

import {
    House,
    Search,
    Library,
    Radio,
    Podcast,
    ListMusic,
    Pin,
    Clock,
    MicVocal,
    GalleryVerticalEnd,
    Music2,
    Grip,
    Star,
    LayoutGrid,
    AudioLines,
    UserRound,
} from "lucide-react";

export default function Sidebar({
    signedIn,
    setSignedIn,
    user,
    setUser,
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const { theme } = useTheme();

    // modal for account on click
    const [accountOpen, setAccountOpen] = useState(false);

    const [showToast, setShowToast] = useState(false);

    const sidebarItemStyle = (active) => ({
        display: "flex",
        alignItems: "center",
        gap: 10,

        height: 33,
        padding: "0 14px",

        borderRadius: 9999,

        cursor: "pointer",

        color: active
            ? theme.colors.text
            : theme.colors.textSecondary,

        background: active
            ? theme.mode === "dark"
                ? "rgba(33,33,33,0)"
                : "rgba(255,255,255,0.95)"
            : "transparent",

        boxShadow: active
            ? theme.mode === "dark"
                ? `
                0 6px 16px rgba(0,0,0,0.22),
                inset 0 1px 0 rgba(255,255,255,0.03)
              `
                : `
                0 8px 22px rgba(0,0,0,0.08),
                inset 0 1px 0 rgba(255,255,255,0.95)
              `
            : "none",

        transition: "all 220ms ease",

        ...theme.typography.body,
    });

    return (
        <div
            style={{
                width: 360, // sidebar width
                padding: 24,
            }}
        >
            <GlassPanel
                blur={false}
                style={{
                    position: "fixed",

                    top: 24,
                    left: 24,

                    width: 312, // 360 - 48 padding

                    height: "calc(100vh - 48px)",

                    overflow: "hidden",

                    padding: 0,

                    color: theme.colors.text,

                    fontFamily: theme.typography.fontFamily,

                    ...theme.typography.body,
                }}
            >
                {/* scrollable area */}
                <div
                    style={{
                        position: "absolute",

                        inset: 0,

                        overflowY: "auto",

                        padding: 28,

                        paddingBottom: 110,
                    }}
                >
                    {/* Logo */}

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,

                            marginBottom: 40,
                        }}
                    >
                        <AudioLines
                            size={22}
                            strokeWidth={1.5}
                            color={theme.colors.text}
                        />

                        <span
                            style={{
                                color: theme.colors.text,
                                ...theme.typography.title,
                            }}
                        >
                            Music
                        </span>
                    </div>

                    {/* Navigation */}

                    {signedIn ? (
                        <>
                            <div
                                style={{
                                    display: "flex",

                                    flexDirection: "column",

                                    gap: 8,
                                }}
                            >
                                <div
                                    style={sidebarItemStyle(location.pathname === "/")}
                                    onClick={() => navigate("/")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <House
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Home</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/search")}
                                    onClick={() => navigate("/search")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/search") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/search") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <Search
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Search</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/new")}
                                    onClick={() => navigate("/new")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/new") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/new") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <LayoutGrid
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>New</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/radio")}
                                    onClick={() => navigate("/radio")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/radio") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/radio") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <Radio
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Radio</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/podcasts")}
                                    onClick={() => navigate("/podcasts")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/podcasts") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/podcasts") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <Podcast
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Podcasts</span>
                                </div>
                            </div>

                            {/* Spacer */}

                            <div
                                style={{
                                    height: 40,
                                }}
                            />

                            {/* Library */}

                            <div
                                style={{
                                    display: "flex",

                                    flexDirection: "column",

                                    gap: 8,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,

                                        height: 33,
                                        padding: "0 14px",

                                        borderRadius: 9999,

                                        ...theme.typography.body,
                                    }}
                                >
                                    <ListMusic
                                        size={15}
                                        strokeWidth={1.5}
                                    />

                                    <span>Library</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/pins")}
                                    onClick={() => navigate("/pins")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/pins") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/pins") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <Pin
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Pins</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/recently-added")}
                                    onClick={() => navigate("/recently-added")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/recently-added") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/recently-added") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <Clock
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Recently Added</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/artists")}
                                    onClick={() => navigate("/artists")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/artists") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/artists") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <MicVocal
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Artists</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/albums")}
                                    onClick={() => navigate("/albums")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/albums") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/albums") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <GalleryVerticalEnd
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Albums</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/songs")}
                                    onClick={() => navigate("/songs")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/songs") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/songs") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <Music2
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Songs</span>
                                </div>
                            </div>

                            {/* Spacer */}

                            <div
                                style={{
                                    height: 40,
                                }}
                            />

                            {/* Playlists */}

                            <div
                                style={{
                                    display: "flex",

                                    flexDirection: "column",

                                    gap: 8,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,

                                        height: 33,
                                        padding: "0 14px",

                                        borderRadius: 9999,

                                        ...theme.typography.body,
                                    }}
                                >
                                    <Library
                                        size={15}
                                        strokeWidth={1.5}
                                    />

                                    <span>Playlists</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/playlists")}
                                    onClick={() => navigate("/playlists")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "/playlists") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/playlists") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <Grip
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>All Playlists</span>
                                </div>

                                <div
                                    style={sidebarItemStyle(location.pathname === "/favourites")}
                                    onClick={() => navigate("/favourites")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-1px)";

                                        if (location.pathname !== "favourites") {
                                            e.currentTarget.style.color = theme.colors.text;

                                            if (theme.mode === "dark") {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 14px rgba(0,0,0,0.20)";
                                            } else {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.65)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 20px rgba(0,0,0,0.06)";
                                            }
                                        }
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";

                                        if (location.pathname !== "/favourites") {
                                            e.currentTarget.style.color = theme.colors.textSecondary;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <Star
                                        size={15}
                                        strokeWidth={1}
                                    />

                                    <span>Favourite Songs</span>
                                </div>

                                {/* playlists array */}
                            </div>
                        </>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,

                                    height: 33,
                                    padding: "0 14px",

                                    borderRadius: 9999,

                                    ...theme.typography.body,

                                }}
                            >
                                <House
                                    size={15}
                                    strokeWidth={1}
                                />

                                <span>Home</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* fixed footer w blur background */}
                <div
                    style={{
                        position: "absolute",

                        left: 0,
                        right: 0,
                        bottom: 0,

                        height: 82,

                        display: "flex",

                        alignItems: "center",

                        gap: 14,

                        padding: "0 28px",

                        borderTop:
                            theme.mode === "dark"
                                ? "1px solid rgba(255, 255, 255, 0)"
                                : "1px solid rgba(255,255,255,0.45)",

                        backdropFilter: "blur(5px)",
                        WebkitBackdropFilter: "blur(5px)",

                        background:
                            theme.mode === "dark"
                                ? "rgba(18, 18, 18, 0)"
                                : "rgba(255,255,255,0.28)",
                    }}
                >
                    {signedIn ? (
                        <>
                            {/* user avatar */}
                            <img
                                src={avatar}
                                alt="Profile"
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    flexShrink: 0,
                                }}
                            />

                            {/* user info */}
                            <div
                                onClick={() => setAccountOpen(true)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    cursor: "pointer",
                                }}
                            >
                                <div
                                    style={{
                                        color: theme.colors.text,
                                        ...theme.typography.body,
                                    }}
                                >
                                    Keeno Smith
                                </div>

                                <div
                                    style={{
                                        color: theme.colors.textSecondary,
                                        fontSize: 11,
                                    }}
                                >
                                    Premium
                                </div>
                            </div>
                        </>
                    ) : (
                        <button
                            // onClick={() => setSignedIn(true)}
                            onClick={async () => {
                                try {
                                    const response = await fetch("http://localhost:5050/api/user");

                                    if (!response.ok) {
                                        throw new Error("Unable to sign in.");
                                    }

                                    const data = await response.json();

                                    setUser(data);
                                    setSignedIn(true);
                                } catch (err) {
                                    console.error(err);
                                }
                            }}
                            style={{
                                width: "100%",
                                height: 42,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,

                                border: "none",
                                outline: "none",

                                cursor: "pointer",

                                borderRadius: 9999,

                                background:
                                    theme.mode === "dark"
                                        ? "rgba(50, 50, 50, 0.08)"
                                        : "rgba(255,255,255,0.55)",

                                boxShadow:
                                    theme.mode === "dark"
                                        ? `
            0 6px 18px rgba(0,0,0,0.22),
            inset 0 1px 0 rgba(255,255,255,0.04)
          `
                                        : `
            0 10px 28px rgba(0,0,0,0.08),
            0 1px 2px rgba(0,0,0,0.05),
            inset 0 1px 0 rgba(255,255,255,0.9)
          `,

                                color: theme.colors.text,

                                transition: "all 220ms ease",

                                ...theme.typography.button,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow =
                                    theme.mode === "dark"
                                        ? `
                0 10px 24px rgba(0,0,0,0.30),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `
                                        : `
                0 16px 34px rgba(0,0,0,0.12),
                0 2px 4px rgba(0,0,0,0.05),
                inset 0 1px 0 rgba(255,255,255,1)
              `;
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    theme.mode === "dark"
                                        ? `
                0 6px 18px rgba(0,0,0,0.22),
                inset 0 1px 0 rgba(255,255,255,0.04)
              `
                                        : `
                0 10px 28px rgba(0,0,0,0.08),
                0 1px 2px rgba(0,0,0,0.05),
                inset 0 1px 0 rgba(255,255,255,0.9)
              `;
                            }}
                        >
                            <UserRound
                                size={16}
                                strokeWidth={1}
                            />

                            <span>Sign In</span>
                        </button>
                    )}
                </div>
            </GlassPanel>
            {/* modal open on account */}
            <GlassModal
                open={accountOpen}
                onClose={() => setAccountOpen(false)}
                onSignOut={() => {
                    setSignedIn(false);
                    setUser(null);
                    setAccountOpen(false);
                }}
                onSave={() => {
                    setAccountOpen(false);

                    setShowToast(true);

                    setTimeout(() => {
                        setShowToast(false);
                    }, 5000);
                }}
            >
            </GlassModal>

            <Toast
                open={showToast}
                message="Profile updated"
            />
        </div>
    );
}