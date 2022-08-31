import * as path from 'path';
import { FileSystem } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';

/**
 * An AWS Lambda layer that includes the AWS CLI.
 */
export class AwsCliLambdaCode extends lambda.AssetCode {
  constructor(options: s3_assets.AssetOptions = {}) {
    super(path.join(__dirname, 'layer.zip'), {
      // we hash the layer directory (it contains the tools versions and Dockerfile) because hashing the zip is non-deterministic
      assetHash: FileSystem.fingerprint(path.join(__dirname, '../layer')),
      ...options,
    });
  }
}
