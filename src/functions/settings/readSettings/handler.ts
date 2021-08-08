import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import validationMiddleware from '@libs/validationMIddleware';

const readSettings: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `readSettings function`,
    test: event?.requestContext?.authorizer?.claims['cognito:groups'],
  });
}

export const main = middyfy(readSettings).use(validationMiddleware({ allowedGroups: ['admin', 'editor'] }))
