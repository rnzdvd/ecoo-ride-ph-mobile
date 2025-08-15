import getStore from '../../../app/store'
import LoadScooterDetailsCase from './load-scooter-details.case'

describe('Load scooter details', () => {
  let useCase: LoadScooterDetailsCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadScooterDetailsCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
