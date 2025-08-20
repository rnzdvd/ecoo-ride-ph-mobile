import getStore from '../../../app/store'
import ClearCurrentRideCase from './clear-current-ride.case'

describe('Clear current ride', () => {
  let useCase: ClearCurrentRideCase

  const store = getStore()

  beforeEach(() => {
    useCase = new ClearCurrentRideCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
