const unitPrices = require('./unit-prices')

module.exports = tierAmounts => {
  const tierCosts = tierAmounts.map(item => ({
    ...item,
    cost: item.unitAmount * unitPrices[item.tier]
  }))

  return {
    tierCosts,
    total: tierCosts.reduce((acc, cur) => acc + cur.cost, 0)
  }
}
