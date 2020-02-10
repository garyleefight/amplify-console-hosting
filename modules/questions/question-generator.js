const Constants = require('../../constants/question-constants');
const inquirer = require('inquirer');

const ANWSER_MANUAL = 'manual';
const ANWSER_CICD = 'cicd';
const ANWSER_LEARN_MORE = 'help';

async function askDeployType() {
    const { anwser } = await inquirer.prompt(
        [
            {
                type: "list",
                name: "anwser",
                message: Constants.DEPLOY_TYPE_QUESTION,
                choices: [
                    Constants.DEPLOY_TYPE_QUESTION_MANUAL,
                    Constants.DEPLOY_TYPE_QUESTION_CICD,
                    Constants.LEARN_MORE
                ],
                default: Constants.DEPLOY_TYPE_QUESTION_MANUAL
            }
        ]
    );
    switch (anwser) {
        case Constants.DEPLOY_TYPE_QUESTION_MANUAL:
            return ANWSER_MANUAL;
        case Constants.DEPLOY_TYPE_QUESTION_CICD:
            return ANWSER_CICD;
        case Constants.LEARN_MORE:
            return ANWSER_LEARN_MORE;
    }
}

async function askCICDConfirmQuestion() {
    return askConfirmQuestion(Constants.CICD_CONFIRM_QUESTION);
} 

async function askViewAppQuestion() {
    return askConfirmQuestion(Constants.VIEW_APP_QUESTION);
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
