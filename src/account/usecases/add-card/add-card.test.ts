import getStore from '../../../app/store'
import AddCardCase from './add-card.case'

describe('Add card', () => {
  let useCase: AddCardCase

  const store = getStore()

  beforeEach(() => {
    useCase = new AddCardCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
