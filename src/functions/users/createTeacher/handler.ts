import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createUserAndAssignGroup } from '@models/UsersModel'

import schema from './schema';
import validationMiddleware from '@libs/validationMIddleware';

const createTeacher: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { name, email } = event.body
  const teacher = await createUserAndAssignGroup(name, email, 'teacher')

  return formatJSONResponse({
    message: teacher,
    event,
  });
}

export const main = middyfy(createTeacher, validationMiddleware({ allowedGroups: ['admin'] }))