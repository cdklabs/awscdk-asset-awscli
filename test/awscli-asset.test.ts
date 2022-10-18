import { FileSystem, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AwsCliAsset } from '../lib';

test('synthesized to a layer version', () => {
  //GIVEN
  const stack = new Stack();
  const asset = new AwsCliAsset();

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