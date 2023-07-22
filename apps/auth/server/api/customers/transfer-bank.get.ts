const TRANSFER_BANKING_DATA = {
  success: true,
  banks: [
    {
      id: '63e8d80ed5b3160c01f970cb',
      bank_name: 'KBANK',
      bank_account_name: 'KBANK',
      bank_account_number: '0111111111',
      active: true,
    },
    {
      id: '63e8dc6dd5b3160c01f970cf',
      bank_name: 'SCB',
      bank_account_name: 'SCB',
      bank_account_number: '0222222222',
      active: true,
    },
    {
      id: '64a686c8a3935c0074be9947',
      bank_name: 'SCB',
      bank_account_name: 'SCB',
      bank_account_number: '0333333333',
      active: true,
    },
  ],
  banksAuto: [
    {
      id: '64adc24902c62902b154413e',
      _id: {
        _bsontype: 'ObjectID',
        id: {
          type: 'Buffer',
          data: [
            100,
            173,
            194,
            73,
            2,
            198,
            41,
            2,
            177,
            84,
            65,
            62,
          ],
        },
      },
      fromAccount: '0111111111',
      createdAt: '2023-07-11T20:57:45.367Z',
      fromBank: 'KBANK',
      individual: 'demo',
      prefix: 'thaibetsoft',
      toAccount: '0333333333',
      toBank: 'KBANK',
      total: 1111,
      totalTransferAutoMin: 11111,
      updatedAt: '2023-07-11T20:57:45.367Z',
    },
  ],
}

export default defineEventHandler(async (event) => {
  return TRANSFER_BANKING_DATA
})
