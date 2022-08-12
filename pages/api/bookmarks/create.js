import { nanoid } from 'nanoid';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { httpMethodEnums } from '../../../consts/HTTP';
import { ddbDocClient } from '../../../libs/ddbDocClient';

const { TABLE_NAME } = process.env;

const handler = async (req, res) => {
  if (req.method === httpMethodEnums.POST) {
    const params = {
      TableName: TABLE_NAME,
      Item: { id: nanoid(12), ...req.body },
    };
    try {
      const response = await ddbDocClient.send(new PutCommand(params));
      return res.status(response['$metadata'].httpStatusCode).json({
        success: true,
        message: 'Bookmark created successfully',
      });
    } catch (err) {
      return res.status(err['$metadata'].httpStatusCode).json({
        success: false,
        message: err.toString(),
      });
    }
  }
};

export default handler;
