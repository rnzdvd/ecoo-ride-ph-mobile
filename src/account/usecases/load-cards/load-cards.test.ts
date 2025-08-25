import getStore from '../../../app/store'
import LoadCardsCase from './load-cards.case'

describe('Load cards', () => {
  let useCase: LoadCardsCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadCardsCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
