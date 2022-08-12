import { AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider';

import { cognitoClient } from '../../../libs/cognitoClient';

const { COGNITO_USER_POOL_ID } = process.env;

export default async function handler(req, res) {
  const { username } = req.query;

  const input = {
    UserPoolId: COGNITO_USER_POOL_ID,
    Username: username,
  };

  const command = new AdminGetUserCommand(input);

  try {
    const response = await cognitoClient.send(command);
    const { UserCreateDate, UserStatus, Username, message } = response;

    if (message) throw new Error(message);

    res.send({
      status: UserStatus,
      username: Username,
      createdAt: UserCreateDate,
    });
  } catch (err) {
    console.log({ err });
    return res
      .status(err['$metadata'].httpStatusCode)
      .json({ message: err.toString() });
  }
}
