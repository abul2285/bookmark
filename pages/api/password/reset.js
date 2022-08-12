import { ConfirmForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';

import { cognitoClient } from '../../../libs/cognitoClient';

const { COGNITO_APP_CLIENT_ID } = process.env;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const params = {
    ClientId: COGNITO_APP_CLIENT_ID,
    ConfirmationCode: req.body.code,
    Password: req.body.password,
    Username: req.body.username,
  };

  const confirmForgotPasswordCommand = new ConfirmForgotPasswordCommand(params);

  try {
    const response = await cognitoClient.send(confirmForgotPasswordCommand);
    console.log(response);
    return res.status(response['$metadata'].httpStatusCode).send();
  } catch (err) {
    console.log(err);
    return res
      .status(err['$metadata'].httpStatusCode)
      .json({ message: err.toString() });
  }
}
