import getStore from '../../../app/store'
import LoadScootersCase from './load-scooters.case'

describe('Load scooters', () => {
  let useCase: LoadScootersCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadScootersCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
