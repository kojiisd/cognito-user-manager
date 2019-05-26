# cognito-user-manager
This is an application for managing Amazon Cognito service. And this application can be applied to AWS Amplify Console for CI/CD.

# Prepare for execution
## Client application
Modify ```environment.ts``` for below.

|No|Name|Contents|
|---:|:---|:---|
|1|REGION|Region of AWS|
|2|USER_POOL_ID|User Pool ID of Cognito|
|3|USER_POOL_WEB_CLIENT_ID|Application Client ID of Cognito|
|4|IDENTITY_POOL_ID|Identity Pool ID of Cognito|
|5|API_BASE_URL|Base URL of API Gateway|
|6|LOCAL_STORAGE_BASE_KEY|Storing key of localStorage|

If you want to build the application, you can execute ```ng build```.

## Server application
Modify ```serverless.yml``` for below.

|No|Name|Contents|
|---:|:---|:---|
|1|USER_POOL_ID|User Pool ID of Cognito|
|2|COGNITO_IDP_ARN|Cognito ARN|

You need to upload this application to AWS with following command.

```
$ sls deploy [--profile <profile> --region <region> --stage <stage>]
```

Region should be same as Client application region.

# Execution on Local
Execute ```ng run start``` or ```ng serve``` in your terminal. And after finishing execution, you can access to ```http://localhost:4200/```

# for AWS Amplify Console
## Overview
This applicaiton build on Amplify Console will use following services.

1. Client scenario test: Karate
2. Server unit test: unittest

And above testing results will be uploaded to S3 bucket for reporting.

## Deploy with configuration
This application can be built on AWS Amplify Console. You can upload ```amplify.yml``` for build configuration and set all Environment valiables to Amplify Console.

|No|Name|Contents|
|---:|:---|:---|
|1|SLS_AWS_ACCOUNT_ID|Serverless application account for deploy|
|2|ACCESS_KEY|Access key of AWS account|
|3|SECRET_KEY|Secret key of AWS account|
|4|COGNITO_IDP_ARN|Cognito ARN|
|5|USER_POOL_ID|User Pool ID of Cognito|
|6|REPORT_BUCKET|Report bucket of S3 for testing result|
|7|REGION|Region of AWS|
|8|USER_POOL_WEB_CLIENT_ID|Application Client ID of Cognito|
|9|IDENTITY_POOL_ID|Identity Pool ID of Cognito|
|10|API_BASE_URL|Base URL of API Gateway|
|11|LOCAL_STORAGE_BASE_KEY|Storing key of localStorage|

