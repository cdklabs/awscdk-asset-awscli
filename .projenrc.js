const { awscdk, JsonPatch, DependencyType } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services, Inc.',
  cdkVersion: '2.0.0',
  defaultReleaseBranch: 'main',
  name: '@aws-cdk/asset-awscli-v1',
  description: 'An Asset construct that contains the AWS CLI, for use in Lambda Layers',
  repositoryUrl: 'git@github.com:cdklabs/awscdk-asset-awscli.git',
  homepage: 'https://github.com/cdklabs/awscdk-asset-awscli#readme',
  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  workflowBootstrapSteps: [
    {
      // This step is required to allow the build workflow to build docker images.
      name: 'Change permissions on /var/run/docker.sock',
      run: 'sudo chown superchain /var/run/docker.sock',
    },
  ],
});

// This patch is required to enable sudo commands in the build workflow, see
// `workflowBootstrapSteps` above for why a sudo command is needed.
const buildWorkflow = project.tryFindObjectFile('.github/workflows/build.yml');
buildWorkflow.patch(JsonPatch.add('/jobs/build/container/options', '--group-add sudo'));

project.preCompileTask.exec('layer/build.sh');

project.synth();