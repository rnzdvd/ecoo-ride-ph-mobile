import getStore from '../../../app/store'
import SetScannedQrCase from './set-scanned-qr.case'

describe('Set scanned qr', () => {
  let useCase: SetScannedQrCase

  const store = getStore()

  beforeEach(() => {
    useCase = new SetScannedQrCase()
  })

  test('execute', async () => {
    await useCase.execute()
    expect(null).toBeTruthy()
  })
})
