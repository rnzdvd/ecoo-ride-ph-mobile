import getStore from '../../../app/store'
import CheckLoginStatusCase from './check-login-status.case'

describe('Check login status', () => {
  let useCase: CheckLoginStatusCase

  const store = getStore()

  beforeEach(() => {
    useCase = new CheckLoginStatusCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
