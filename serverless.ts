import type { AWS } from '@serverless/typescript';
import * as dotenv from 'dotenv'

dotenv.config()

import {
  createTeacher,
  createStudent
} from '@functions/index'

/**
 * We've 3 access levels, ADMIN, TEACHER and STUDENT
 * ADMIN can access all of endpoints
 * TEACHER can access all of endpoints except the categories ep
 * STUDENT can access only the blog endpoints
 */

const serverlessConfiguration: AWS = {
  service: 'cognito-multi-level',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    // Here we can set our env var to this current document (yml)
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}'
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'sa-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      // Here we can define our env var to the whole system
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      CURRENT_STAGE: '${self:custom.stage}',
      REGION: '${self:custom.region}',
      USER_POOL_ID: process.env.USER_POOL_ID,
      ACCESS_KEY: process.env.ACCESS_KEY,
      SECRET_KEY: process.env.SECRET_KEY
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    createTeacher,
    createStudent
  },
  resources: {
    Resources: {
      CognitoUserPool: {
        Type: 'AWS::Cognito::UserPool',
        Properties: {
          UserPoolName: '${self:custom.stage}-user-pool',
          UsernameAttributes: ['email'],
          AutoVerifiedAttributes: ['email']
        }
      },
      CognitoUserPoolClient: {
        Type: 'AWS::Cognito::UserPoolClient',
        Properties: {
          ClientName: '${self:custom.stage}-user-pool-client',
          UserPoolId: {
            Ref: 'CognitoUserPool'
          },
          ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH'],
          GenerateSecret: false
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
