const joi = require('joi')

// Define config schema
const schema = joi.object({
  serviceName: joi.string().default('BNG Credits Estimator')
})

// Build config
const config = {
  serviceName: process.env.SERVICE_NAME
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The service config is invalid. ${result.error.message}`)
}

module.exports = result.value
