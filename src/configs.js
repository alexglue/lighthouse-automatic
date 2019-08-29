const chalk = require('chalk');
const cwd = require('cwd');
const location = cwd();
const path = require('path');
let pkg = {};
let config = {};
let targets = {};

const getPackage = () => {
    //check location of app running;
    const isDebug = location.includes('node_packages/lighthouse-automatic');
    pkg = require(path.join(isDebug ? '../' : cwd(), 'package.json'));
    targets = require(path.join(isDebug ? '../' : cwd(), 'target.json'));

    config = pkg['lighthouse-automatic'];

    if (!config) {
        throw new Error(
            'lighthouse-automatic.json Config requires lighthouse-automatic options'
        );
    }

    config.isDebug = isDebug;
    config.urls = targets;
    config.version = pkg.version;

    if (!config.urls) {
        throw new Error('Lighthouse-automatic config requires URLS object');
    }

    if (!config.runOnce && !config.minutes) {
        throw new Error(
            "Lighthouse expects minutes configuration when not in 'runOnce' mode"
        );
    }

    return config;
};

module.exports = getPackage();
