#!/usr/bin/env node
/**
 * Backend Data Scheduler for Spaceflight Library
 * 
 * This script runs continuously and updates the api-snapshot.json 
 * every 12 hours. It should be started as a background service.
 * 
 * Usage:
 *   node scheduler.cjs              # Run in foreground
 *   nohup node scheduler.cjs &      # Run in background (Linux/Mac)
 *   pm2 start scheduler.cjs         # Run with PM2 process manager
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ll.thespacedevs.com/2.2.0';
const SNAPSHOT_PATH = path.resolve(__dirname, 'src/api-snapshot.json');

// 12 hours in milliseconds
const UPDATE_INTERVAL = 12 * 60 * 60 * 1000;

// Retry settings
const MAX_RETRIES = 3;
const RETRY_DELAY = 5 * 60 * 1000; // 5 minutes

async function fetchData() {
    console.log(`[${new Date().toISOString()}] 🚀 Fetching latest space stats from API...`);

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

    return {
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
}

async function updateStats(retryCount = 0) {
    try {
        const snapshot = await fetchData();

        fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2));
        console.log(`[${new Date().toISOString()}] ✅ Successfully updated api-snapshot.json`);
        console.log(`   📊 ${snapshot.launches.total} launches, ${snapshot.humans.total} astronauts in space`);
        return true;

    } catch (error) {
        if (error.response && error.response.status === 429) {
            const retryAfter = error.response.data?.detail?.match(/(\d+) seconds/)?.[1] || 300;
            console.log(`[${new Date().toISOString()}] ⏳ Rate limited. Retry in ${retryAfter} seconds.`);

            if (retryCount < MAX_RETRIES) {
                const waitTime = Math.max(parseInt(retryAfter) * 1000, RETRY_DELAY);
                setTimeout(() => updateStats(retryCount + 1), waitTime);
                return false;
            }
        }

        console.error(`[${new Date().toISOString()}] ❌ Failed to fetch stats:`, error.message);

        if (retryCount < MAX_RETRIES) {
            console.log(`   ♻️ Retrying in 5 minutes... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
            setTimeout(() => updateStats(retryCount + 1), RETRY_DELAY);
            return false;
        }

        console.error(`   ⛔ Max retries reached. Will try again at next scheduled interval.`);
        return false;
    }
}

function formatDuration(ms) {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const mins = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${mins}m`;
}

async function main() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('   Spaceflight Library - Backend Data Scheduler');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`   Update interval: ${formatDuration(UPDATE_INTERVAL)}`);
    console.log(`   Snapshot path: ${SNAPSHOT_PATH}`);
    console.log('═══════════════════════════════════════════════════════');
    console.log('');

    // Run immediately on start
    await updateStats();

    // Schedule recurring updates
    setInterval(async () => {
        console.log('');
        console.log('─── Scheduled Update ───');
        await updateStats();
    }, UPDATE_INTERVAL);

    console.log('');
    console.log(`⏰ Next update scheduled in ${formatDuration(UPDATE_INTERVAL)}`);
    console.log('   Press Ctrl+C to stop the scheduler.');
}

main();
