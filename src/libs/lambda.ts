import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = (handler, validator) => {
  return middy(handler).use(middyJsonBodyParser()).use(validator)
}
