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

module.exports = {
    askDeployType
}
