import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib/core';
import * as cr from 'aws-cdk-lib/custom-resources';

import { AwsCliLayerCode } from '../lib';

/**
 * Test verifies that AWS CLI is invoked successfully inside Lambda runtime.
 */

const app = new cdk.App();

const stack = new cdk.Stack(app, 'lambda-layer-awscli-integ-stack');
const layer = new lambda.LayerVersion(stack, 'AwsCliLayer', {
  code: AwsCliLayerCode.code,
  description: '/opt/awscli/aws',
});

const runtimes = [
  lambda.Runtime.PYTHON_3_7,
  lambda.Runtime.PYTHON_3_9,
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

app.synth();
