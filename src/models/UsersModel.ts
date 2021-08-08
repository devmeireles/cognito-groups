import { formatJSONResponse } from '@libs/apiGateway'
import { CognitoIdentityServiceProvider } from 'aws-sdk'

const cognitoProvider = new CognitoIdentityServiceProvider({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
})

/**
 * Creates a user and assign to a group
 * @param name 
 * @param email 
 */
export const createUserAndAssignGroup = async (name: string, email: string, group: string) => {
    const params = {
        Username: email,
        UserPoolId: process.env.USER_POOL_ID
    }

    try {
        const result = await cognitoProvider.adminCreateUser(params).promise()

        const addToGroupParams = {
            GroupName: group,
            UserPoolId: process.env.USER_POOL_ID,
            Username: email,
        };

        await cognitoProvider.adminAddUserToGroup(addToGroupParams).promise()

        return result
    } catch (error) {
        return formatJSONResponse({
            message: error.message
        }, 403)
    }
}

export const listUserByGroup = async (group: string) => {
    try {
        const params: CognitoIdentityServiceProvider.ListUsersInGroupRequest = {
            GroupName: group,
            UserPoolId: process.env.USER_POOL_ID
        }

        const result = await cognitoProvider.listUsersInGroup(params).promise()

        return result
    } catch (error) {
        console.log(error)

        return formatJSONResponse({
            message: error.message
        }, 403)
    }
}