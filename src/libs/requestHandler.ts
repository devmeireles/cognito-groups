import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export default function handler<T>(lambda: (event: APIGatewayEvent, context: Context) => Promise<T>) {
    return async function (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
        try {
            const responseBody = await lambda(event, context);
            return ({
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                statusCode: 200,
                body: JSON.stringify(responseBody),
            })
        } catch (e) {

            /* eslint-disable no-console */
            console.error("Error occurred while processing request.", e)
            /* eslint-enable no-console */

            return ({
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                statusCode: e.status || 500,
                body: JSON.stringify({ error: e.message }),
            })
        }
    };
}
