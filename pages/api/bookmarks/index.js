import { ScanCommand } from '@aws-sdk/lib-dynamodb';

import { ddbDocClient } from '../../../libs/ddbDocClient.js';

const { TABLE_NAME } = process.env;

export const scanTable = async (res) => {
  const params = { TableName: TABLE_NAME };
  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    res.send(data.Items);
  } catch (err) {
    return {
      success: false,
      message: err.toString(),
    };
  }
};

export default scanTable;
