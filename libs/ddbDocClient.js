// Create a service client module using ES6 syntax.
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export { ddbDocClient };
