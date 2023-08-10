const routeName = 'credits-cost'

const toLocaleString = str => str.toLocaleString('en-gb', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })
const getRow = ({ tier, unitAmount, cost }) =>
  [{ text: tier.toUpperCase() }, { text: unitAmount, format: 'numeric' }, { text: toLocaleString(cost), format: 'numeric' }]

module.exports = [
  {
    method: 'GET',
    path: `/${routeName}`,
    options: {
      auth: false
    },
    handler: (request, h) => {
      const creditCosts = request.yar.get('credit-estimator-cost')
      const totalCost = toLocaleString(creditCosts.total)
      return h.view(routeName, {
        totalCost,
        tierRows: [
          ...creditCosts.tierCosts.map(item => getRow(item)),
          [{ text: 'Total estimated cost' }, { text: '' }, { text: totalCost, format: 'numeric' }]
        ]
      })
    }
  }
]
