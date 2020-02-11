const enableMod = require('./enable');
const publshMod = require('./publish');
const initMod = require('./initEnv');

function enable(context) {
    enableMod.enable(context);
}

async function publish(context) {
    publshMod.publish(context);
}

function initEnv(context) {
    initMod.initEnv(context);
}

module.exports = {
    enable,
    publish,
    initEnv
};