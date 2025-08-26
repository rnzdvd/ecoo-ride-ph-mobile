import getStore from '../../../app/store'
import LoadEWalletsCase from './load-e-wallets.case'

describe('Load e wallets', () => {
  let useCase: LoadEWalletsCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadEWalletsCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
