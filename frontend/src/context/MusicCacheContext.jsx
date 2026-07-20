import { createContext, useContext } from "react";

const MusicCacheContext = createContext(null);

export function useMusicCache() {
    const context = useContext(MusicCacheContext);

    if (!context) {
        throw new Error(
            "useMusicCache must be used within MusicCacheProvider"
        );
    }

    return context;
}

export default MusicCacheContext;