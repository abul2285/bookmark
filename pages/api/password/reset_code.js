import { ForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';

import { cognitoClient } from '../../../libs/cognitoClient';

const { COGNITO_APP_CLIENT_ID } = process.env;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const params = {
    ClientId: COGNITO_APP_CLIENT_ID,
    Username: req.body.username,
  };

  const forgotPasswordCommand = new ForgotPasswordCommand(params);

  try {
    const response = await cognitoClient.send(forgotPasswordCommand);
    console.log(response);
    return res.status(response['$metadata'].httpStatusCode).send();
  } catch (err) {
    console.log(err);
    return res
      .status(err['$metadata'].httpStatusCode)
      .json({ message: toString() });
  }
}
