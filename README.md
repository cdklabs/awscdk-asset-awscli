# Asset with AWS CLI v1
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Stable](https://img.shields.io/badge/cdk--constructs-stable-success.svg?style=for-the-badge)

---

<!--END STABILITY BANNER-->


This module exports a single class called `AwsCliAsset` which is an `s3_assets.Asset` that bundles the AWS CLI v1.

Any Lambda Function that uses a LayerVersion created from this Asset must use a Python 3.x runtime.

Usage:

```ts
// AwsCliLayer bundles the AWS CLI in a lambda layer
import { AwsCliAsset } from '@aws-cdk/asset-awscli-v1';

declare const fn: lambda.Function;
const awscli = new AwsCliAsset(this, 'AwsCliCode');
fn.addLayers(new lambda.LayerVersion(this, 'AwsCliLayer', {
  code: lambda.Code.fromBucket(awscli.bucket, awscli.s3ObjectKey),
}));
```

The CLI will be installed under `/opt/awscli/aws`.
