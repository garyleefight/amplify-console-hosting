const constants = require('../constants/plugin-constants');

function getAppIdForCurrEnv(context) {
    const { amplify } = context;
    const currEnv = amplify.getEnvInfo().envName;
    const teamProviderInfo = getTeamProviderInfo(context);
    return teamProviderInfo[currEnv][constants.PROVIDER][constants.APPID_KEY];
}

function getTeamProviderInfo(context) {
    const { amplify } = context;
    const teamProviderInfoFilePath = amplify.pathManager.getProviderInfoFilePath();
    const teamProviderInfo = amplify.readJsonFile(teamProviderInfoFilePath);
    return teamProviderInfo;
}

module.exports = {
    getAppIdForCurrEnv,
    getTeamProviderInfo
}


