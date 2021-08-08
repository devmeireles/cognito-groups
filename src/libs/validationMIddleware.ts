type validationMIddlewareOptions = {
    allowedGroups: string[]
}

const validationMiddleware = (options: validationMIddlewareOptions) => {
    return ({
        before: (handler, next) => {
            try {
                let group = handler.event.requestContext.authorizer.claims['cognito:groups']
                if (typeof group === 'object') group = group[0]
                if (!options.allowedGroups.includes(group)) {
                    return handler.callback(null, options)
                }
                return next()
            } catch (error) {
                console.log(error)
                return handler.callback(null, 200)
            }
        }
    })
}

export default validationMiddleware