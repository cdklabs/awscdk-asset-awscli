import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AwsCliAsset } from '../lib';
import { AssetConstructCode } from './utils/lambda-code-utils';

test('synthesized to a layer version', () => {
  //GIVEN
  const stack = new Stack();
  const asset = new AwsCliAsset(stack, 'layer-asset');

  // WHEN
  new lambda.LayerVersion(stack, 'MyLayer', {
    code: new AssetConstructCode(asset),
    description: '/opt/awscli/aws',
  });

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/awscli/aws',
  });
});