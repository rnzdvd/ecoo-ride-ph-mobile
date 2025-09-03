import getStore from '../../../app/store'
import LoadRideDistanceByIdCase from './load-ride-distance-by-id.case'

describe('Load ride distance by id', () => {
  let useCase: LoadRideDistanceByIdCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadRideDistanceByIdCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
