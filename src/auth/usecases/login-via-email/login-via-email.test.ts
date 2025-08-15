import getStore from '../../../app/store'
import LoginViaEmailCase from './login-via-email.case'

describe('Login via email', () => {
  let useCase: LoginViaEmailCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoginViaEmailCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
