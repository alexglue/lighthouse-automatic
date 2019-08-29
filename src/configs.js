const chalk = require('chalk');
const cwd = require('cwd');
const location = cwd();
const path = require('path');
let pkg = {};
let config = {};

const getPackage = () => {
    //check location of app running;
    const isDebug = location.includes('node_packages/lighthouse-automatic');
    let config = require(path.join(isDebug ? '../' : cwd(), 'lighthouse-automatic.json'));

    config.isDebug = isDebug;

    if (!config) {
        throw new Error(
            'lighthouse-automatic.json Config requires lighthouse-automatic options'
        );
    }

    if (!config.urls) {
        throw new Error('Lighthouse-automatic config requires URLS object');
    }

    if (!config.runOnce && !config.minutes) {
        throw new Error(
            "Lighthouse expects minutes configuration when not in 'runOnce' mode"
        );
    }

    config.version = pkg.version;
    return config;
};

module.exports = getPackage();
