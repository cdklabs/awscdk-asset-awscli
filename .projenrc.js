const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services, Inc.',
  cdkVersion: '2.0.0',
  defaultReleaseBranch: 'main',
  name: 'awscdk-lambda-layer-awscli-v1',
  repositoryUrl: 'git@github.com:cdklabs/awscdk-lambda-layer-awscli-v1.git',

  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  packageName: '@aws-cdk/lambda-layer-awscli-v1',
});

project.preCompileTask.exec('layer/build.sh');
project.synth();