import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createUserAndAssignGroup } from '@models/UsersModel'

import schema from './schema';
import validationMiddleware from '@libs/validationMIddleware';

const createStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { name, email } = event.body
  const student = await createUserAndAssignGroup(name, email, 'student')

  console.log(student)

  return formatJSONResponse({
    message: student,
    event,
  });
}

export const main = middyfy(createStudent)
  .use(validationMiddleware({ allowedGroups: ['admin', 'teacher'] }))