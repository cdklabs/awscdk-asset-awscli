# Asset with AWS CLI v1
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

---

> This library is currently under development. Do not use!

<!--END STABILITY BANNER-->


This module exports a single class called `AwsCliAsset` which is an `s3_assets.Asset` that bundles the AWS CLI v1.

Any Lambda Function or Lambda Layer that uses this Asset as its code must use a Python 3.x runtime.

Usage:

```ts
// AwsCliLayer bundles the AWS CLI in a lambda layer
import { AwsCliAsset } from '@aws-cdk/asset-awscli-v1';

declare const fn: lambda.Function;
fn.addLayers(new lambda.LayerVersion(this, 'AwsCliLayer', {
  code: lambda.Code.fromAssetConstruct(new AwsCliAsset(this, 'AwsCliCode')),
}));
```

The CLI will be installed under `/opt/awscli/aws`.
