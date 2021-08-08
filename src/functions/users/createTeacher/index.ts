import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'users/teacher/create',
        request: {
          schemas: {
            'application/json': schema
          }
        },
        authorizer: {
          name: 'authorizer',
          arn: 'arn:aws:cognito-idp:sa-east-1:408927935259:userpool/sa-east-1_zrS5dvchA',
          // claims: ['email', 'group']
        }
      }
    }
  ]
}
