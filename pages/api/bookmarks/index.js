import { ScanCommand } from '@aws-sdk/lib-dynamodb';

import { ddbDocClient } from '../../../libs/ddbDocClient.js';

const { TABLE_NAME } = process.env;

export const scanTable = async (_, res) => {
  const params = { TableName: TABLE_NAME };
  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    return res.send(data.Items);
  } catch (err) {
    return res.send({
      success: false,
      message: err.toString(),
    });
  }
};

export default scanTable;
