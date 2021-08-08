// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'blog/posts',
        // authorizer: {
        //   name: 'authorizer',
        //   arn: 'arn:aws:iam::408927935259:role/aws-service-role/ops.apigateway.amazonaws.com/AWSServiceRoleForAPIGateway'
        // }
        // request: {
        //   schemas: {
        //     'application/json': schema
        //   }
        // }
      }
    }
  ]
}
