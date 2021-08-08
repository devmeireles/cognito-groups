import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { listUserByGroup } from '@models/UsersModel'

import schema from './schema';
import validationMiddleware from '@libs/validationMIddleware';

const listUsers: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {

  const users = await listUserByGroup('admin')

  return formatJSONResponse({
    message: users
  });
}

export const main = middyfy(listUsers, validationMiddleware({ allowedGroups: ['admin'] }))