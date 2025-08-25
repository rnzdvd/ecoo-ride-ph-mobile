import getStore from '../../../app/store'
import RemoveCardCase from './remove-card.case'

describe('Remove card', () => {
  let useCase: RemoveCardCase

  const store = getStore()

  beforeEach(() => {
    useCase = new RemoveCardCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
