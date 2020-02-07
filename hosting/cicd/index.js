const enableMod = require('./enable');
const publshMod = require('./publish');

async function enable(context) {
    await enableMod.enable(context);
}

function publish(context) {
    publshMod.publish(context);
}

module.exports = {
    enable,
    publish
};