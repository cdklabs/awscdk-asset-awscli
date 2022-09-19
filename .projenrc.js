const { awscdk, JsonPatch, DependencyType } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services, Inc.',
  cdkVersion: '2.0.0',
  defaultReleaseBranch: 'main',
  name: '@aws-cdk/asset-awscli-v1',
  description: 'An Asset construct that contains the AWS CLI, for use in Lambda Layers',
  repositoryUrl: 'https://github.com/cdklabs/awscdk-asset-awscli.git',
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
  npmAccess: NpmAccess.PUBLIC,
  publishToPypi: {
    distName: 'aws-cdk.asset-awscli-v1',
    module: 'aws_cdk.asset_awscli_v1',
  },
  publishToMaven: {
    javaPackage: 'software.amazon.awscdk.cdk.asset.awscli.v1',
    mavenGroupId: 'software.amazon.awscdk',
    mavenArtifactId: 'cdk-asset-awscli-v1',
    mavenEndpoint: 'https://aws.oss.sonatype.org',
  },
  publishToNuget: {
    dotNetNamespace: 'Amazon.CDK.Asset.AwsCliV1',
    packageId: 'Amazon.CDK.Asset.AwsCliV1',
  },
  publishToGo: {
    moduleName: 'github.com/cdklabs/awscdk-asset-awscli-go',
    packageName: 'awscliv1',
    gitUserName: 'AWS CDK Team',
    gitUserEmail: 'aws-cdk@amazon.com',
    githubTokenSecret: 'PROJEN_GITHUB_TOKEN',
  },
});

// These patches are required to enable sudo commands in the workflows under `workflowBootstrapSteps`,
// see `workflowBootstrapSteps` above for why a sudo command is needed.
const buildWorkflow = project.tryFindObjectFile('.github/workflows/build.yml');
buildWorkflow.patch(JsonPatch.add('/jobs/build/container/options', '--group-add sudo'));
const releaseWorkflow = project.tryFindObjectFile('.github/workflows/release.yml');
releaseWorkflow.patch(JsonPatch.add('/jobs/release/container/options', '--group-add sudo'));
const upgradeWorkflow = project.tryFindObjectFile('.github/workflows/upgrade-main.yml');
upgradeWorkflow.patch(JsonPatch.add('/jobs/upgrade/container/options', '--group-add sudo'));

project.preCompileTask.exec('layer/build.sh');

project.synth();
