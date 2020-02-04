const constants = require('../constants/plugin-constants');
const path = require('path');
const pathManager = require('../utils/path-manager');
const fs = require('fs-extra');
const questions = require('../modules/questions/question-generator');

async function enable(context) {
    const deployType = await questions.askDeployType();
    const hostingModule = require('./' + deployType + '/index');
    await hostingModule.enable(context);
}

module.exports = {
    enable
};