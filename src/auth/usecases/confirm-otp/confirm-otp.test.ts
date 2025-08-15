import getStore from '../../../app/store'
import ConfirmOtpCase from './confirm-otp.case'

describe('Confirm otp', () => {
  let useCase: ConfirmOtpCase

  const store = getStore()

  beforeEach(() => {
    useCase = new ConfirmOtpCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
