import getStore from '../../../app/store'
import RequestOtpCase from './request-otp.case'

describe('Request otp', () => {
  let useCase: RequestOtpCase

  const store = getStore()

  beforeEach(() => {
    useCase = new RequestOtpCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
