import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const {
  COGNITO_REGION,
  AWS_ACCESS_KEY_ID,
  COGNITO_USER_POOL_ID,
  COGNITO_APP_CLIENT_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const params = {
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
    ClientId: COGNITO_APP_CLIENT_ID,
    UserPoolId: COGNITO_USER_POOL_ID,
    AuthParameters: {
      USERNAME: req.body.username,
      PASSWORD: req.body.password,
    },
  };

  console.log({ params });

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
  const adminInitiateAuthCommand = new AdminInitiateAuthCommand(params);

  try {
    const response = await cognitoClient.send(adminInitiateAuthCommand);
    console.log(response);
    return res.status(200).json({
      success: true,
    });
    // return res.status(response['$metadata'].httpStatusCode).json({
    //   ...response.AuthenticationResult,
    // });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
    });
    // return res
    //   .status(err['$metadata'].httpStatusCode)
    //   .json({ message: err.toString() });
  }
}
