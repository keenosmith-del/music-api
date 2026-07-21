import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Sidebar from "./components/layout/Sidebar";
import FloatingPlayer from "./components/layout/FloatingPlayer";

import Home from "./pages/Home/Home";
import Search from "../src/pages/Search/Search";
import New from "../src/pages/New/New";
import Radio from "../src/pages/Radio/Radio";
import Podcasts from "../src/pages/Podcasts/Podcasts";

import Pins from "../src/pages/Pins/Pins";
import RecentlyAdded from "../src/pages/RecentlyAdded/RecentlyAdded";
import Artists from "../src/pages/Artists/Artists";
import Albums from "../src/pages/Albums/Albums";
import Songs from "../src/pages/Songs/Songs";

import AllPlaylists from "../src/pages/AllPlaylists/AllPlaylists";
import FavouriteSongs from "../src/pages/FavouriteSongs/FavouriteSongs";

import Album from "../src/components/common/Album";
import Artist from "../src/components/common/Artist";
import Podcast from "../src/components/common/Podcast";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AppLayout
                        sidebar={<Sidebar />}
                        player={<FloatingPlayer />}
                    />
                }
            >
                <Route index element={<Home />} />

                <Route path="search" element={<Search />} />
                <Route path="new" element={<New />} />
                <Route path="radio" element={<Radio />} />
                <Route path="podcasts" element={<Podcasts />} />

                <Route path="album/:id" element={<Album />} />

                <Route path="artist/:id" element={<Artist />} />

                <Route
                    path="/podcast/:id"
                    element={<Podcast />}
                />

                <Route path="pins" element={<Pins />} />
                <Route path="recently-added" element={<RecentlyAdded />} />
                <Route path="artists" element={<Artists />} />
                <Route path="albums" element={<Albums />} />
                <Route path="songs" element={<Songs />} />

                <Route path="playlists" element={<AllPlaylists />} />
                <Route path="favourites" element={<FavouriteSongs />} />
            </Route>
        </Routes>
    );
}