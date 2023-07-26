describe('Server test', () => {
  test('server returns createServer', () => {
    const createServer = require('../../../../app/server')
    expect(createServer).toBeDefined()
  })
})
