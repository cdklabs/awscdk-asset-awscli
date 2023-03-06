# Asset with AWS CLI v2
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

---

> This library is currently under development. Do not use!

<!--END STABILITY BANNER-->

This module exports a single class called `AwsCliAsset` which is an `s3_assets.Asset` that bundles the AWS CLI v2.

Usage:

```ts
// AwsCliLayer bundles the AWS CLI in a lambda layer
import { AwsCliAsset } from '@aws-cdk/asset-awscli-v2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import { FileSystem } from 'aws-cdk-lib';

declare const fn: lambda.Function;
const awscli = new AwsCliAsset(this, 'AwsCliCode');
fn.addLayers(new lambda.LayerVersion(this, 'AwsCliLayer', {
  code: lambda.Code.fromBucket(awscli.bucket, awscli.s3ObjectKey),
}));
```

The CLI will be installed under `/opt/awscli/aws`.
