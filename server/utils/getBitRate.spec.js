import { describe, test, jest, expect } from '@jest/globals'
import config from './config.js'
import { getBitRate } from './getBitRate.js'

const { constants: { fallbackBiteRate } } = config

const mockExecuteSoxCommand = jest.fn()

jest.mock('./commands.js', () => ({
  executeSoxCommand: mockExecuteSoxCommand
}))


describe('#Utils - getBitRate', () => {
  test('it should return fallbackBiteRate if a error occur', async () => {
    mockExecuteSoxCommand.mockRejectedValueOnce(new Error('error'))

    const result = await getBitRate('song.mp3')

    expect(result).toEqual(fallbackBiteRate)
  })
})