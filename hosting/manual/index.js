const constants = require('../../constants/plugin-constants');
const path = require('path');
const pathManager = require('../../utils/path-manager');
const fs = require('fs-extra');
const utils = require('../../utils/amplify-context-utils');

function enable(context) {
    //Constants
    const category = constants.CATEGORY;
    const resourceName = constants.CONSOLE_RESOURCE_NAME;
    const categories = constants.CATEGORY;

    // Init template
    const templateFilePath = path.join(__dirname, constants.TEMPLATE_DIR, constants.TEMPLATE_FILE_NAME);
    const templateContent = context.amplify.readJsonFile(templateFilePath);
    const serviceDirPath = pathManager.getAmplifyHostingDirPath(context);

    fs.ensureDirSync(pathManager.getHostingDirPath(context));
    fs.ensureDirSync(serviceDirPath);

    let jsonString = JSON.stringify(templateContent, null, 4);
    fs.writeFileSync(pathManager.getTemplatePath(context), jsonString, 'utf8');

    // Init meta
    const metaData = {
        service: resourceName,
        providerPlugin: constants.PROVIDER,
        type: constants.TYPE_MANUAL
    }

    context.amplify.updateamplifyMetaAfterResourceAdd(
        category,
        resourceName,
        metaData
    );

    // Init team-provider-info
    const { amplify } = context;
    const currEnv = amplify.getEnvInfo().envName;
    const teamProviderInfoFilePath = pathManager.getProviderInfoFilePath();
    const teamProviderInfo = amplify.readJsonFile(teamProviderInfoFilePath);
    if (!teamProviderInfo[currEnv][categories]) {
        teamProviderInfo[currEnv][categories] = {};
    }

    if (!teamProviderInfo[currEnv][categories][category]) {
        teamProviderInfo[currEnv][categories][category] = {};
    }

    if (!teamProviderInfo[currEnv][categories][category][resourceName]) {
        teamProviderInfo[currEnv][categories][category][resourceName] = {};
    }

    const appId = utils.getAppIdForCurrEnv(context);
    teamProviderInfo[currEnv][categories][category][resourceName] = {
        appId: appId,
        type: TYPE_MANUAL
    }
    fs.writeFileSync(teamProviderInfoFilePath, JSON.stringify(teamProviderInfo, null, 4));

    // Init backend config
    const backendConfigFilePath = pathManager.getBackendConfigPath();
    const backendConfig = context.amplify.readJsonFile(backendConfigFilePath);

    if (!backendConfig[category]) {
        backendConfig[category] = {}
    }

    if (!backendConfig[category][resourceName]) {
        backendConfig[category][resourceName] = {}
    }

    backendConfig[category][resourceName] = {
        type: TYPE_MANUAL
    }
}

module.exports = {
    enable
};