import QuestionGenerator from '../modules/questions/question-generator'
const hostingModule = require('../hosting/index');

async function run(context) {
    hostingModule.enable(context);
  }
  
  module.exports = {
    run,
  };