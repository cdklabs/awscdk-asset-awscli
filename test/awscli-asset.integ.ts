import * as path from 'path';
import { App, CustomResource, Duration, FileSystem, Stack } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cr from 'aws-cdk-lib/custom-resources';
import { AwsCliAsset } from '../lib';

/**
 * Test verifies that AWS CLI is invoked successfully inside Lambda runtime.
 */

const app = new App();

const stack = new Stack(app, 'lambda-layer-awscli-integ-stack');
const asset = new AwsCliAsset();
const layer = new lambda.LayerVersion(stack, 'AwsCliLayer', {
  code: lambda.Code.fromAsset(asset.path, { assetHash: FileSystem.fingerprint(asset.pathToGenerateAssetHash) }),
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
      timeout: Duration.seconds(30),
    }),
  });

  new CustomResource(stack, `CustomResource${runtime.name}`, {
    serviceToken: provider.serviceToken,
  });
}

app.synth();
