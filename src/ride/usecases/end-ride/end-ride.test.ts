import getStore from '../../../app/store'
import EndRideCase from './end-ride.case'

describe('End ride', () => {
  let useCase: EndRideCase

  const store = getStore()

  beforeEach(() => {
    useCase = new EndRideCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
