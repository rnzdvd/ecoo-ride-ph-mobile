import getStore from '../../../app/store'
import RequestPaymentCase from './request-payment.case'

describe('Request payment', () => {
  let useCase: RequestPaymentCase

  const store = getStore()

  beforeEach(() => {
    useCase = new RequestPaymentCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
