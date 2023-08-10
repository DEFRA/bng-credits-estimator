const Joi = require('joi')
const calculateCost = require('../credits/calculate')

const routeName = 'credits-tier'
const errorMessage = { text: '2 decimal places please' }
const inputSchema = Joi.string().regex(/^[0-9]*(\.\d{1,2})?$/).allow('')

module.exports = [
  {
    method: 'GET',
    path: `/${routeName}`,
    options: {
      auth: false
    },
    handler: (request, h) => {
      return h.view(routeName)
    }
  },
  {
    method: 'POST',
    path: `/${routeName}`,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          a1: inputSchema,
          a2: inputSchema,
          a3: inputSchema,
          a4: inputSchema,
          a5: inputSchema,
          h: inputSchema,
          w: inputSchema
        }),
        failAction (request, h, err) {
          const errorMessages = {}
          err.details.forEach(e => (errorMessages[e.context.key] = errorMessage))
          return h.view(routeName, {
            ...request.payload,
            errorMessages
          }).takeover()
        }
      }
    },
    handler: (request, h) => {
      const tierUnitAmounts = Object.entries(request.payload).map(([k, v]) =>
        ({ tier: k, unitAmount: Number(v) || 0 })
      )

      request.yar.set('credit-estimator-cost', calculateCost(tierUnitAmounts))
      return h.redirect('credits-cost')
    }
  }
]
