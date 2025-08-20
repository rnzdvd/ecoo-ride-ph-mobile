import getStore from '../../../app/store'
import SetSelectedOptionCase from './set-selected-option.case'

describe('Set selected option', () => {
  let useCase: SetSelectedOptionCase

  const store = getStore()

  beforeEach(() => {
    useCase = new SetSelectedOptionCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
