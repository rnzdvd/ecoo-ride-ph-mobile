import getStore from '../../../app/store'
import LoadPaymentOptionsCase from './load-payment-options.case'

describe('Load payment options', () => {
  let useCase: LoadPaymentOptionsCase

  const store = getStore()

  beforeEach(() => {
    useCase = new LoadPaymentOptionsCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
