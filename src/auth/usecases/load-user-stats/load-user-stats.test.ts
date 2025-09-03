import getStore from '../../../app/store'
import LoadUserStatsCase from './load-user-stats.case'

describe('Load user stats', () => {
  let useCase: LoadUserStatsCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadUserStatsCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
