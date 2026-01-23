const axios = require('axios');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ll.thespacedevs.com/2.2.0';
const SNAPSHOT_PATH = path.resolve(__dirname, 'src/api-snapshot.json');

async function updateStats() {
    console.log('🚀 Fetching latest space stats from API...');
    try {
        const [
            allAttempts,
            successfulLaunches,
            failedLaunches,
            spaceXLaunches,
            humansInSpace
        ] = await Promise.all([
            axios.get(`${BASE_URL}/launch/?year=2026&status__ids=3,4,7&mode=list&limit=100`),
            axios.get(`${BASE_URL}/launch/?year=2026&status__ids=3&mode=list&limit=1`),
            axios.get(`${BASE_URL}/launch/?year=2026&status__ids=4,7&mode=list&limit=1`),
            axios.get(`${BASE_URL}/launch/?year=2026&lsp__name=SpaceX&status__ids=3,4,7&mode=list&limit=1`),
            axios.get(`${BASE_URL}/astronaut/?in_space=true&limit=50`)
        ]);

        const snapshot = {
            lastUpdated: new Date().toISOString(),
            launches: {
                total: allAttempts.data.count,
                success: successfulLaunches.data.count,
                failure: failedLaunches.data.count,
                spacex: spaceXLaunches.data.count,
                list: allAttempts.data.results
            },
            humans: {
                total: humansInSpace.data.count,
                people: humansInSpace.data.results
            }
        };

        fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2));
        console.log(`✅ Successfully updated ${SNAPSHOT_PATH}`);
        console.log(`✨ Captured ${snapshot.launches.list.length} launches and ${snapshot.humans.people.length} astronauts.`);
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error('❌ API Rate Limit Exceeded. Try again in a few minutes.');
            console.error(error.response.data);
        } else {
            console.error('❌ Failed to fetch stats:', error.message);
        }
        process.exit(1);
    }
}

updateStats();
