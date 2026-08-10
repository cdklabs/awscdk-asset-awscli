import * as path from 'path';
import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cr from 'aws-cdk-lib/custom-resources';

import { AwsCliAsset } from '../src';

/**
 * Test verifies that AWS CLI is invoked successfully inside Lambda runtime.
 */
const app = new cdk.App();

// The integ-runner enables '@aws-cdk/core:validateAgainstDefaultRules' through its
// recommended feature flags. This is a deploy-only test with no assertions, so the
// IntegTest "DeployAssert" stack contains no resources, which trips the default
// CloudFormation validation rule F0001 ("Resources section must exist and be
// non-empty") and fails synthesis. Opt this test out of default-rule validation.
app.node.setContext('@aws-cdk/core:validateAgainstDefaultRules', false);

const stack = new cdk.Stack(app, 'lambda-layer-awscli-integ-stack');
const asset = new AwsCliAsset(stack, 'layer-asset');
const layer = new lambda.LayerVersion(stack, 'AwsCliLayer', {
  code: lambda.Code.fromBucket(asset.bucket, asset.s3ObjectKey),
  description: '/opt/awscli/aws',
});

const runtimes = [
  lambda.Runtime.PYTHON_3_9,
  lambda.Runtime.PYTHON_3_12,
  lambda.Runtime.NODEJS_LATEST,
];

for (const runtime of runtimes) {
  const provider = new cr.Provider(stack, `Provider${runtime.name}`, {
    onEventHandler: new lambda.Function(stack, `Lambda$${runtime.name}`, {
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
      handler: 'index.handler',
      runtime: runtime,
      architecture: lambda.Architecture.ARM_64,
      layers: [layer],
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
    }),
  });

  new cdk.CustomResource(stack, `CustomResource${runtime.name}`, {
    serviceToken: provider.serviceToken,
  });
}

new IntegTest(app, 'integ-test', {
  testCases: [stack],
  stackUpdateWorkflow: false, // don't think it's necessary to test the update workflow for this test
});
