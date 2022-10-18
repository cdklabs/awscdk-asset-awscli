import * as path from 'path';
import { ILambdaLayerAsset } from '@aws-cdk/interfaces';
import { FileSystem } from 'aws-cdk-lib';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';

/**
 * A CDK Asset construct that contains the AWS CLI.
 */
export class AwsCliAsset extends s3_assets.Asset implements ILambdaLayerAsset {
  public readonly bucketArn: string;
  public readonly key: string;

  constructor(scope: Construct, id: string, options: s3_assets.AssetOptions = {}) {
    super(scope, id, {
      path: path.join(__dirname, 'layer.zip'),
      // we hash the layer directory (it contains the tools versions and Dockerfile) because hashing the zip is non-deterministic
      assetHash: FileSystem.fingerprint(path.join(__dirname, '../layer')),
      ...options,
    });
    this.bucketArn = this.bucket.bucketArn;
    this.key = this.s3ObjectKey;
  }
}
