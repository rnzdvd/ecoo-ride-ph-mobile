import getStore from '../../../app/store'
import LoadBalanceCase from './load-balance.case'

describe('Load balance', () => {
  let useCase: LoadBalanceCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadBalanceCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
