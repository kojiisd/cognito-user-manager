export const environment = {
  production: false,
  amplify: {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_InjFgmS9z',
      userPoolWebClientId: '498su8mcidle5ugl669m0f0n37',
      identityPoolId: 'us-east-1:efb7168b-5475-40a9-9cea-dcd56cd7a366'
    }
  },

  apiBaseUrl: 'https://rqfaw56eq8.execute-api.us-east-1.amazonaws.com/dev',

  localstorageBaseKey: 'CognitoIdentityServiceProvider.498su8mcidle5ugl669m0f0n37'
};

