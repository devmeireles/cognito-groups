import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'settings',
        cors: true,
        authorizer: 'aws_iam',
        request: {
          schemas: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
