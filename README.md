# AWS Lambda Code with AWS CLI v1
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Stable](https://img.shields.io/badge/cdk--constructs-stable-success.svg?style=for-the-badge)

---

<!--END STABILITY BANNER-->


This module exports a single class called `AwsCliLayerCode` which has a `lambda.Code` that bundles the AWS CLI v1.

Any Lambda Function or Lambda Layer that uses this code must use a Python 3.x runtime.

Usage:

```ts
// AwsCliLayer bundles the AWS CLI in a lambda layer
import { AwsCliLayerCode } from '@aws-cdk/lambda-layer-awscli-v1';

declare const fn: lambda.Function;
fn.addLayers(new lambda.LayerVersion(this, 'AwsCliLayer', {
  code: AwsCliLayerCode.code
}));
```

The CLI will be installed under `/opt/awscli/aws`.
