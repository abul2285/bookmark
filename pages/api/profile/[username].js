import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';

const { COGNITO_REGION, COGNITO_USER_POOL_ID } = process.env;

export default async function handler(req, res) {
  console.log({ COGNITO_REGION, COGNITO_USER_POOL_ID });
  const { username } = req.query;

  const input = {
    UserPoolId: COGNITO_USER_POOL_ID,
    Username: username,
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });
  const command = new AdminGetUserCommand(input);

  try {
    const response = await cognitoClient.send(command);
    const { UserCreateDate, UserStatus, Username } = response;

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
