import { AdminInitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

import { cognitoClient } from '../../libs/cognitoClient';

const { COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } = process.env;

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

  const adminInitiateAuthCommand = new AdminInitiateAuthCommand(params);

  try {
    const response = await cognitoClient.send(adminInitiateAuthCommand);
    return res.status(response['$metadata'].httpStatusCode).json({
      ...response.AuthenticationResult,
    });
  } catch (err) {
    return res
      .status(err['$metadata'].httpStatusCode)
      .json({ message: err.toString() });
  }
}
