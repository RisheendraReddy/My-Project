const awsconfig = {
  Auth: {
    identityPoolId: 'us-east-1:1b622430-2f95-405c-acc6-4cbc9531d647', // REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_xxxxxxxx', // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx', // OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: 'uploadfilejson', // REQUIRED -  Amazon S3 bucket name
      region: 'us-east-1', // REQUIRED -  Amazon service region
    },
  },
  API: {
    endpoints: [
      {
        name: '04n0klx0h3',
        endpoint: 'https://04n0klx0h3.execute-api.us-east-1.amazonaws.com/prod',
        region: 'us-east-1',
      },
    ],
  },
};

export default awsconfig;
