import axios from 'axios';

const BASE_URL = 'https://ll.thespacedevs.com/2.2.0';

export async function fetchLiveStats() {
    try {
        // API with rate limits (caution on frequent reloads)
        // status__ids:
        // 3 = Launch Successful
        // 4 = Launch Failure
        // 7 = Partial Failure

        const [
            allAttempts,
            successfulLaunches,
            failedLaunches,
            spaceXLaunches,
            humansInSpace
        ] = await Promise.all([
            // Total Attempts (Success + Failure + Partial) - Limit 100 to get a list
            axios.get(`${BASE_URL}/launch/?year=2026&status__ids=3,4,7&mode=list&limit=100`),
            // Successful
            axios.get(`${BASE_URL}/launch/?year=2026&status__ids=3&mode=list&limit=1`),
            // Failures
            axios.get(`${BASE_URL}/launch/?year=2026&status__ids=4,7&mode=list&limit=1`),
            // SpaceX Attempts
            axios.get(`${BASE_URL}/launch/?year=2026&lsp__name=SpaceX&status__ids=3,4,7&mode=list&limit=1`),
            // Humans in Space - Limit 50 to get everyone
            axios.get(`${BASE_URL}/astronaut/?in_space=true&limit=50`)
        ]);

        return {
            launches: {
                total: allAttempts.data.count,
                success: successfulLaunches.data.count,
                failure: failedLaunches.data.count,
                spacex: spaceXLaunches.data.count,
                list: allAttempts.data.results // Passing the results array for detailed view
            },
            humans: {
                total: humansInSpace.data.count,
                people: humansInSpace.data.results // Passing list of astronauts
            }
        };
    } catch (error) {
        console.error("Failed to fetch space stats:", error);
        return null;
    }
}
