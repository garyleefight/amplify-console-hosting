const constants = require('../../constants/question-constants');
const inquirer = require('inquirer');
const pluginConstants = require('../../constants/plugin-constants');

const ANWSER_MANUAL = 'manual';
const ANWSER_CICD = 'cicd';
const ANWSER_LEARN_MORE = 'help';

async function askDeployType() {
    const { anwser } = await inquirer.prompt(
        [
            {
                type: "list",
                name: "anwser",
                message: constants.DEPLOY_TYPE_QUESTION,
                choices: [
                    constants.DEPLOY_TYPE_QUESTION_MANUAL,
                    constants.DEPLOY_TYPE_QUESTION_CICD,
                    constants.LEARN_MORE
                ],
                default: constants.DEPLOY_TYPE_QUESTION_MANUAL
            }
        ]
    );
    switch (anwser) {
        case constants.DEPLOY_TYPE_QUESTION_MANUAL:
            return pluginConstants.TYPE_MANUAL;
        case constants.DEPLOY_TYPE_QUESTION_CICD:
            return pluginConstants.TYPE_CICD;
        case constants.LEARN_MORE:
            return pluginConstants.TYPE_HELP;
    }
}

async function askCICDConfirmQuestion() {
    return askConfirmQuestion(constants.CICD_CONFIRM_QUESTION);
} 

async function askViewAppQuestion() {
    return askConfirmQuestion(constants.VIEW_APP_QUESTION);
}

async function askConfirmQuestion(message) {
    const questionKey = 'question';
    const anwser = await inquirer.prompt([
        {
            type: "confirm",
            name: questionKey,
            message: message,
            default: true
        }
    ]);
    return anwser[questionKey];
}

module.exports = {
    askDeployType,
    askViewAppQuestion,
    askCICDConfirmQuestion
}
