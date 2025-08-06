import getStore from '../../../app/store'
import RegisterAccountCase from './register-account.case'

describe('Register account', () => {
  let useCase: RegisterAccountCase

  const store = getStore()

  beforeEach(() => {
    useCase = new RegisterAccountCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
