import {
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

import { httpMethodEnums } from '../../../../consts/HTTP';
import { ddbDocClient } from '../../../../libs/ddbDocClient';

const { TABLE_NAME } = process.env;

const getItem = async (id) => {
  const params = { TableName: TABLE_NAME, Key: { id } };

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    if (!data.Item) throw `No item found with id: ${id}`;
    return data.Item;
  } catch (err) {
    return { success: false, message: err.toString() };
  }
};

export const updateItem = async (id, { title, description }) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set title = :t, description = :d',
    ExpressionAttributeValues: {
      ':t': title,
      ':d': description,
    },
  };
  try {
    await ddbDocClient.send(new UpdateCommand(params));
    return { success: true, message: 'Bookmark updated successfully' };
  } catch (err) {
    return {
      success: false,
      message: err.toString(),
    };
  }
};

export const deleteItem = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  try {
    await ddbDocClient.send(new DeleteCommand(params));
    return { success: true, message: 'Bookmark deleted successfully' };
  } catch (err) {
    return {
      success: false,
      message: err.toString(),
    };
  }
};

async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case httpMethodEnums.GET:
      return res.send(await getItem(id));
    case httpMethodEnums.PUT:
      return res.send(await updateItem(id, req.body));
    case httpMethodEnums.DELETE:
      return res.send(await deleteItem(id));
  }
}

export default handler;
