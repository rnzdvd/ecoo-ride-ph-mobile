import getStore from '../../../app/store'
import LoadRideHistoryCase from './load-ride-history.case'

describe('Load ride history', () => {
  let useCase: LoadRideHistoryCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadRideHistoryCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
