const constants = require('../constants/plugin-constants');
const path = require('path');
const pathManager = require('../utils/path-manager');
const fs = require('fs-extra');
const utils = require('../utils/amplify-context-utils');
const questions = require('../modules/questions/question-generator');
const ValidationError = require('../error/validation-error').default;
const clientFactory = require('../utils/client-factory');
const ora = require('ora');

const VALIDATING_MESSAGE = 'Validating ...'

async function enable(context) {
    await validateHosting(context);
    const deployType = await questions.askDeployType();
    const hostingModule = require('./' + deployType + '/index');
    await hostingModule.enable(context);
}

async function publish(context) {
    if(!isHostingEnabled(context)) {
        throw new ValidationError("Amplify console hosting hasn't been enabled");
    }

    const deployType = loadDeployType(context);
    const hostingModule = require('./' + deployType + '/index');
    await hostingModule.publish(context);

}

function loadDeployType(context) {
    const amplifyMetaFilePath = pathManager.getAmplifyMetaFilePath(context);
    const amplifyMeta = context.amplify.readJsonFile(amplifyMetaFilePath);

    try {
        return amplifyMeta[constants.CATEGORY][constants.CONSOLE_RESOURCE_NAME].type
    } catch(err) {
        throw new ValidationError("Amplify console hosting information is missed from amplify meta file");
    }
}

async function validateHosting(context) {
    const spinner = ora();
    spinner.start(VALIDATING_MESSAGE);
    try {
        if (isHostingEnabled(context)) {
            spinner.stop();
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
        spinner.stop();
    } catch(err) {
        spinner.stop();
        throw err;
    }

}

function isHostingEnabled(context) {
    return fs.existsSync(pathManager.getAmplifyHostingDirPath(context));
}

module.exports = {
    enable,
    publish
};