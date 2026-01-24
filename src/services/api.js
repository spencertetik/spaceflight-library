import snapshot from '../api-snapshot.json';

// Use the pre-fetched snapshot data from GitHub Actions
// This avoids hitting the API rate limits on the client side
export async function fetchLiveStats() {
    try {
        // Return the snapshot data that's updated every 12 hours by GitHub Actions
        return {
            launches: {
                total: snapshot.launches.total,
                success: snapshot.launches.success,
                failure: snapshot.launches.failure,
                spacex: snapshot.launches.spacex,
                list: snapshot.launches.list
            },
            humans: {
                total: snapshot.humans.total,
                people: snapshot.humans.people
            },
            lastUpdated: snapshot.lastUpdated
        };
    } catch (error) {
        console.error("Failed to load space stats snapshot:", error);
        return null;
    }
}
