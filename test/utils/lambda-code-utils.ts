import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';

export class AssetConstructCode extends lambda.Code {
  public readonly isInline = false;
  constructor(private readonly asset: s3_assets.Asset) {
    super();
  }

  public bind(_scope: Construct): lambda.CodeConfig {
    return {
      s3Location: {
        bucketName: this.asset.s3BucketName,
        objectKey: this.asset.s3ObjectKey,
      },
    };
  }
}