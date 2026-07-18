const BASE_URL = "https://de1.api.radio-browser.info/json";

async function request(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
        throw new Error("Radio Browser request failed.");
    }

    return await response.json();
}

function mapStations(stations) {
    return stations.slice(0, 12).map((station) => ({
        id: station.stationuuid,

        name: station.name,

        artwork: station.favicon,

        country: station.country,

        genre: station.tags,

        language: station.language,

        stream: station.url_resolved,
    }));
}

export async function getTrendingStations() {
    const stations = await request("/stations/topclick/12");

    return mapStations(stations);
}

export async function getRockStations() {
    const stations = await request("/stations/bytag/rock");

    return mapStations(stations);
}

export async function getHipHopStations() {
    const stations = await request("/stations/bytag/hiphop");

    return mapStations(stations);
}

export async function getLiveStations() {
    const stations = await request("/stations/bytag/live");

    return mapStations(stations);
}

export async function getDJMixStations() {
    const stations = await request("/stations/bytag/dj");

    return mapStations(stations);
}