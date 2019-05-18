# AwsAmplifyUserManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.  
This program can produce manamagement functions and screens for Amazon Cognito.

# Preparation
To execute this program, needs to configure following.

[environment.ts]
```ts
export const environment = {
  production: false,
  amplify: {
    Auth: {
      region: 'XXXXXXX',                                    // Region code
      userPoolId: 'XXXXXXXXXXXXXX',                         // Amazon Cognito UserPool ID
      userPoolWebClientId: 'XXXXXXXXXXXXXXXX',              // Amazon Cognito Application client ID
      identityPoolId: 'XXXXXXXXXXXXXXXX'                    // Amazon Cognito Identity pool ID
    }
  },

  apiBaseUrl: 'XXXXXXXXXXX',                                // API Gateway base URL

  localstorageBaseKey: 'CognitoIdentityServiceProvider.XXXXXXXXXXXXX'  // Local storage key (CognitoIdentityServiceProvider.<userPoolWebClientId>)
};
```

# Local Execute
For local execute:

```sh
$ npm run start
```

# Deploy