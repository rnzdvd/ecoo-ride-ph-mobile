import getStore from '../../../app/store'
import LogoutCase from './logout.case'

describe('Logout', () => {
  let useCase: LogoutCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LogoutCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
