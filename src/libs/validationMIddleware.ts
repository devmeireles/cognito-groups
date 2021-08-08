type validationMIddlewareOptions = {
    allowedGroups: string[]
}

const validationMiddleware = (options: validationMIddlewareOptions) => {
    return ({
        before: (handler, next) => {
            try {
                const group = handler.event?.requestContext?.authorizer?.claims['cognito:groups'][0]
                if (!options.allowedGroups.includes(group)) {
                    return handler.callback(null, options)
                }
                return next()
            } catch (error) {
                return handler.callback(null, 200)
            }
        }
    })
}

export default validationMiddleware