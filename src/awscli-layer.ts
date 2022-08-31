import * as path from 'path';
import { FileSystem } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

/**
 * An AWS Lambda layer that includes the AWS CLI.
 */
export class AwsCliLayerCode {
  public static readonly code: lambda.Code = lambda.Code.fromAsset(path.join(__dirname, 'layer.zip'), {
    // we hash the layer directory (it contains the tools versions and Dockerfile) because hashing the zip is non-deterministic
    assetHash: FileSystem.fingerprint(path.join(__dirname, '../layer')),
  });
  private constructor() {}
}
