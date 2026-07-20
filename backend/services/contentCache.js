const cache = new Map();

export function getCached(key) {
    const entry = cache.get(key);

    if (!entry) {
        return null;
    }

    if (Date.now() > entry.expiresAt) {
        cache.delete(key);
        return null;
    }

    return entry.data;
}

export function setCached(key, data, ttl = 10 * 60 * 1000) {
    cache.set(key, {
        data,
        expiresAt: Date.now() + ttl,
    });
}

export function clearCached(key) {
    cache.delete(key);
}

export function clearAllCache() {
    cache.clear();
}