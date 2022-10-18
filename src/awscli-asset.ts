import * as path from 'path';

/**
 * A CDK Asset construct that contains the AWS CLI.
 */
export class AwsCliAsset implements AssetSource {
  public readonly path: string = path.join(__dirname, 'layer.zip');

  // we hash the layer directory (it contains the tools versions and Dockerfile) because hashing the zip is non-deterministic
  public readonly pathToGenerateAssetHash: string = path.join(__dirname, '../layer');
}

/**
 * Temporary measure until @aws-cdk/interfaces is released and we can depend on that
 */
interface AssetSource {
  readonly path: string;
  readonly pathToGenerateAssetHash?: string;
}