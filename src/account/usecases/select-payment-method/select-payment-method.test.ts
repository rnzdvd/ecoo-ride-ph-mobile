import getStore from '../../../app/store'
import SelectPaymentMethodCase from './select-payment-method.case'

describe('Select payment method', () => {
  let useCase: SelectPaymentMethodCase

  const store = getStore()

  beforeEach(() => {
    useCase = new SelectPaymentMethodCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
