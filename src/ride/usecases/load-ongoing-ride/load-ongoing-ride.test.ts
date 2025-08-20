import getStore from '../../../app/store'
import LoadOngoingRideCase from './load-ongoing-ride.case'

describe('Load ongoing ride', () => {
  let useCase: LoadOngoingRideCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadOngoingRideCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
