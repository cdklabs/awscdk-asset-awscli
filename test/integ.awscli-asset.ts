import * as path from 'path';
<<<<<<< HEAD:test/awscli-asset.integ.ts
=======
import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
>>>>>>> f068af9 (chore: switch to using `integ-runner` (#122)):test/integ.awscli-asset.ts
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib/core';
import * as cr from 'aws-cdk-lib/custom-resources';
import { AwsCliAsset } from '../lib';

/**
 * Test verifies that AWS CLI is invoked successfully inside Lambda runtime.
 */

const app = new cdk.App();

const stack = new cdk.Stack(app, 'lambda-layer-awscliv2-integ-stack');
const asset = new AwsCliAsset(stack, 'layer-asset');
const layer = new lambda.LayerVersion(stack, 'AwsCliLayer', {
  code: lambda.Code.fromBucket(asset.bucket, asset.s3ObjectKey),
  description: '/opt/awscli/aws',
});

const runtimes = [
  lambda.Runtime.PYTHON_3_7,
  lambda.Runtime.PYTHON_3_9,
  lambda.Runtime.NODEJS_14_X,
];

for (const runtime of runtimes) {
  const provider = new cr.Provider(stack, `Provider${runtime.name}`, {
    onEventHandler: new lambda.Function(stack, `Lambda$${runtime.name}`, {
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
      handler: 'index.handler',
      runtime: runtime,
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
