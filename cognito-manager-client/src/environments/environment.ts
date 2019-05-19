export const environment = {
  production: false,
  amplify: {
    Auth: {
      region: 'REGION',
      userPoolId: 'USER_POOL_ID',
      userPoolWebClientId: 'USER_POOL_WEB_CLIENT_ID',
      identityPoolId: 'IDENTITY_POOL_ID'
    }
  },

  apiBaseUrl: 'API_BASE_URL',

  localstorageBaseKey: 'LOCAL_STORAGE_BASE_KEY'
};