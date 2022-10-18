import { FileSystem, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AwsCliV1Asset } from '../lib';

test('synthesized to a layer version', () => {
  //GIVEN
  const stack = new Stack();
  const asset = new AwsCliV1Asset();

  // WHEN
  new lambda.LayerVersion(stack, 'MyLayer', {
    code: lambda.Code.fromAsset(asset.path, { assetHash: FileSystem.fingerprint(asset.pathToGenerateAssetHash) }),
    description: '/opt/awscli/aws',
  });

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/awscli/aws',
  });
});