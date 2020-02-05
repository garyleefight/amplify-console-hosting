const constants = require('../constants/plugin-constants');
const path = require('path');
const pathManager = require('../utils/path-manager');
const fs = require('fs-extra');
const utils = require('../utils/amplify-context-utils');
const questions = require('../modules/questions/question-generator');
const ValidationError = require('../error/validation-error').default;
const clientFactory = require('../utils/client-factory');

async function enable(context) {
    await validateHosting(context);
    const deployType = await questions.askDeployType();
    const hostingModule = require('./' + deployType + '/index');
    await hostingModule.enable(context);
}

async function validateHosting(context) {
    if (fs.existsSync(pathManager.getAmplifyHostingDirPath(context))) {
        throw new ValidationError('Amplify Console hosting has already been enabled');
    }
    const appId = utils.getAppIdForCurrEnv(context);
    const amplifyClient = await clientFactory.getAmplifyClient(context);
    const result = await amplifyClient.listBranches({
        appId: appId
    }).promise();
    if (result.branches.length > 0) {
        throw new ValidationError('Branches has already been added to amplify app. Can not enable local host');
    }
}

module.exports = {
    enable
};