const enableMod = require('./enable');
const publshMod = require('./publish');
const initEnv = require('./initEnv');

async function enable(context) {
    await enableMod.enable(context);
}

async function publish(context) {
    await publshMod.publish(context);
}

function initEnv(context) {
    initMod.initEnv(context);
}

module.exports = {
    enable,
    publish,
    initEnv
};