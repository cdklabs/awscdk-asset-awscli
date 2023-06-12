import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AwsCliAsset } from '../src';

test('synthesized to a layer version', () => {
  //GIVEN
  const stack = new Stack();
  const asset = new AwsCliAsset(stack, 'layer-asset');

  // WHEN
  new lambda.LayerVersion(stack, 'MyLayer', {
    code: lambda.Code.fromBucket(asset.bucket, asset.s3ObjectKey),
    description: '/opt/awscli/aws',
  });

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/awscli/aws',
  });
});