const { awscdk, DependencyType } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services, Inc.',
  cdkVersion: '2.0.0',
  defaultReleaseBranch: 'main',
  name: 'awscdk-lambda-code-awscli-v1',
  description: 'A Lambda Code object that contains the AWS CLI, for use in Lambda Layers',
  repositoryUrl: 'git@github.com:cdklabs/awscdk-lambda-layer-awscli-v1.git',

  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  // TODO: add the @aws-cdk namespace
  packageName: 'lambda-code-awscli-v1',
});
project.deps.removeDependency('constructs', DependencyType.PEER);
project.deps.addDependency('constructs', DependencyType.BUILD);

project.preCompileTask.exec('layer/build.sh');

project.synth();