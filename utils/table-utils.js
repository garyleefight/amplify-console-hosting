const clientFactory = require('./client-factory');
const ora = require('ora');
const Table = require('cli-table3');

async function generateTableContentForApp(context, appId) {
  const amplifyClient = await clientFactory.getAmplifyClient(context);
  const domainMap = {};

  let nextToken = null;
  const spinner = ora();
  try {
    spinner.start('Checking default domains');
    do {
      const { branches } = await amplifyClient.listBranches({
        appId,
        nextToken,
      }).promise();

      for (const branch of branches) {
        const { branchName } = branch;
        domainMap[branchName] = [];
        domainMap[branchName].push(`https://${branchName}.${appId}.amplifyapp.com`);
      }
    } while (nextToken != null);
    spinner.succeed('Checking default domains completed');
    spinner.start('Checking custom domains');

    nextToken = null;
    do {
      const { domainAssociations } = await amplifyClient.listDomainAssociations({
        appId,
        nextToken,
      }).promise();

      for (const domainAssociation of domainAssociations) {
        const { domainName, subDomains } = domainAssociation;
        for (const subDomain of subDomains) {
          const { prefix, branchName } = subDomain.subDomainSetting;
          if (!domainMap[branchName]) {
            domainMap[branchName] = [];
          }
          domainMap[branchName].push(`https://${prefix}.${domainName}`);
        }
      }
    } while (nextToken != null);
    spinner.succeed(('Checking custom domains completed'));
    // Init table
    const table = new Table({
      head: ['FrontEnd Env', 'Domain'],
    });

    for (const [branchName, domains] of Object.entries(domainMap)) {
      for (let index = 0; index < domains.length; index++) {
        if (index === 0) {
          table.push([{
            rowSpan: domains.length,
            content: branchName,
          }, domains[index]]);
        } else {
          table.push([domains[index]]);
        }
      }
    }
    console.log('Amplify hosting urls: ');
    console.log(table.toString());
  } catch (err) {
    spinner.fail(err.message);
  }
}


module.exports = {
  generateTableContentForApp,
};
