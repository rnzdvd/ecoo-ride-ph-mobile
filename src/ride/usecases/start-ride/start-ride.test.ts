import getStore from '../../../app/store'
import StartRideCase from './start-ride.case'

describe('Start ride', () => {
  let useCase: StartRideCase

  const store = getStore()

  beforeEach(() => {
    useCase = new StartRideCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
