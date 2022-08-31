# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### AwsCliLambdaCode <a name="AwsCliLambdaCode" id="lambda-code-awscli-v1.AwsCliLambdaCode"></a>

An AWS Lambda layer that includes the AWS CLI.

#### Initializers <a name="Initializers" id="lambda-code-awscli-v1.AwsCliLambdaCode.Initializer"></a>

```typescript
import { AwsCliLambdaCode } from 'lambda-code-awscli-v1'

new AwsCliLambdaCode(options?: AssetOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.Initializer.parameter.options">options</a></code> | <code>aws-cdk-lib.aws_s3_assets.AssetOptions</code> | *No description.* |

---

##### `options`<sup>Optional</sup> <a name="options" id="lambda-code-awscli-v1.AwsCliLambdaCode.Initializer.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3_assets.AssetOptions

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.bind">bind</a></code> | Called when the lambda or layer is initialized to allow this object to bind to the stack, add resources and have fun. |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.bindToResource">bindToResource</a></code> | Called after the CFN function resource has been created to allow the code class to bind to it. |

---

##### `bind` <a name="bind" id="lambda-code-awscli-v1.AwsCliLambdaCode.bind"></a>

```typescript
public bind(scope: Construct): CodeConfig
```

Called when the lambda or layer is initialized to allow this object to bind to the stack, add resources and have fun.

###### `scope`<sup>Required</sup> <a name="scope" id="lambda-code-awscli-v1.AwsCliLambdaCode.bind.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `bindToResource` <a name="bindToResource" id="lambda-code-awscli-v1.AwsCliLambdaCode.bindToResource"></a>

```typescript
public bindToResource(resource: CfnResource, options?: ResourceBindOptions): void
```

Called after the CFN function resource has been created to allow the code class to bind to it.

Specifically it's required to allow assets to add
metadata for tooling like SAM CLI to be able to find their origins.

###### `resource`<sup>Required</sup> <a name="resource" id="lambda-code-awscli-v1.AwsCliLambdaCode.bindToResource.parameter.resource"></a>

- *Type:* aws-cdk-lib.CfnResource

---

###### `options`<sup>Optional</sup> <a name="options" id="lambda-code-awscli-v1.AwsCliLambdaCode.bindToResource.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.ResourceBindOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.fromAsset">fromAsset</a></code> | Loads the function code from a local disk path. |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.fromAssetImage">fromAssetImage</a></code> | Create an ECR image from the specified asset and bind it as the Lambda code. |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.fromBucket">fromBucket</a></code> | Lambda handler code as an S3 object. |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.fromCfnParameters">fromCfnParameters</a></code> | Creates a new Lambda source defined using CloudFormation parameters. |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.fromDockerBuild">fromDockerBuild</a></code> | Loads the function code from an asset created by a Docker build. |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.fromEcrImage">fromEcrImage</a></code> | Use an existing ECR image as the Lambda code. |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.fromInline">fromInline</a></code> | Inline code for Lambda handler. |

---

##### `fromAsset` <a name="fromAsset" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromAsset"></a>

```typescript
import { AwsCliLambdaCode } from 'lambda-code-awscli-v1'

AwsCliLambdaCode.fromAsset(path: string, options?: AssetOptions)
```

Loads the function code from a local disk path.

###### `path`<sup>Required</sup> <a name="path" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromAsset.parameter.path"></a>

- *Type:* string

Either a directory with the Lambda code bundle or a .zip file.

---

###### `options`<sup>Optional</sup> <a name="options" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromAsset.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3_assets.AssetOptions

---

##### `fromAssetImage` <a name="fromAssetImage" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromAssetImage"></a>

```typescript
import { AwsCliLambdaCode } from 'lambda-code-awscli-v1'

AwsCliLambdaCode.fromAssetImage(directory: string, props?: AssetImageCodeProps)
```

Create an ECR image from the specified asset and bind it as the Lambda code.

###### `directory`<sup>Required</sup> <a name="directory" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromAssetImage.parameter.directory"></a>

- *Type:* string

the directory from which the asset must be created.

---

###### `props`<sup>Optional</sup> <a name="props" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromAssetImage.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.AssetImageCodeProps

properties to further configure the selected image.

---

##### `fromBucket` <a name="fromBucket" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromBucket"></a>

```typescript
import { AwsCliLambdaCode } from 'lambda-code-awscli-v1'

AwsCliLambdaCode.fromBucket(bucket: IBucket, key: string, objectVersion?: string)
```

Lambda handler code as an S3 object.

###### `bucket`<sup>Required</sup> <a name="bucket" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromBucket.parameter.bucket"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket.

---

###### `key`<sup>Required</sup> <a name="key" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromBucket.parameter.key"></a>

- *Type:* string

The object key.

---

###### `objectVersion`<sup>Optional</sup> <a name="objectVersion" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromBucket.parameter.objectVersion"></a>

- *Type:* string

Optional S3 object version.

---

##### `fromCfnParameters` <a name="fromCfnParameters" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromCfnParameters"></a>

```typescript
import { AwsCliLambdaCode } from 'lambda-code-awscli-v1'

AwsCliLambdaCode.fromCfnParameters(props?: CfnParametersCodeProps)
```

Creates a new Lambda source defined using CloudFormation parameters.

###### `props`<sup>Optional</sup> <a name="props" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromCfnParameters.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.CfnParametersCodeProps

optional construction properties of {@link CfnParametersCode}.

---

##### `fromDockerBuild` <a name="fromDockerBuild" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromDockerBuild"></a>

```typescript
import { AwsCliLambdaCode } from 'lambda-code-awscli-v1'

AwsCliLambdaCode.fromDockerBuild(path: string, options?: DockerBuildAssetOptions)
```

Loads the function code from an asset created by a Docker build.

By default, the asset is expected to be located at `/asset` in the
image.

###### `path`<sup>Required</sup> <a name="path" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromDockerBuild.parameter.path"></a>

- *Type:* string

The path to the directory containing the Docker file.

---

###### `options`<sup>Optional</sup> <a name="options" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromDockerBuild.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.DockerBuildAssetOptions

Docker build options.

---

##### `fromEcrImage` <a name="fromEcrImage" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromEcrImage"></a>

```typescript
import { AwsCliLambdaCode } from 'lambda-code-awscli-v1'

AwsCliLambdaCode.fromEcrImage(repository: IRepository, props?: EcrImageCodeProps)
```

Use an existing ECR image as the Lambda code.

###### `repository`<sup>Required</sup> <a name="repository" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromEcrImage.parameter.repository"></a>

- *Type:* aws-cdk-lib.aws_ecr.IRepository

the ECR repository that the image is in.

---

###### `props`<sup>Optional</sup> <a name="props" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromEcrImage.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.EcrImageCodeProps

properties to further configure the selected image.

---

##### `fromInline` <a name="fromInline" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromInline"></a>

```typescript
import { AwsCliLambdaCode } from 'lambda-code-awscli-v1'

AwsCliLambdaCode.fromInline(code: string)
```

Inline code for Lambda handler.

###### `code`<sup>Required</sup> <a name="code" id="lambda-code-awscli-v1.AwsCliLambdaCode.fromInline.parameter.code"></a>

- *Type:* string

The actual handler code (limited to 4KiB).

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.property.isInline">isInline</a></code> | <code>boolean</code> | Determines whether this Code is inline code or not. |
| <code><a href="#lambda-code-awscli-v1.AwsCliLambdaCode.property.path">path</a></code> | <code>string</code> | The path to the asset file or directory. |

---

##### `isInline`<sup>Required</sup> <a name="isInline" id="lambda-code-awscli-v1.AwsCliLambdaCode.property.isInline"></a>

```typescript
public readonly isInline: boolean;
```

- *Type:* boolean

Determines whether this Code is inline code or not.

---

##### `path`<sup>Required</sup> <a name="path" id="lambda-code-awscli-v1.AwsCliLambdaCode.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The path to the asset file or directory.

---



