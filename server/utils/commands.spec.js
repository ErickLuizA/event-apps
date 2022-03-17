import { describe, expect, jest, test } from '@jest/globals'
import childProcess from 'child_process'
import { executeSoxCommand } from './commands'

describe('#Utils - commands', () => {
  test('should spawn proccess with given args', () => {
    const args = ['--i', '-B', '🔥🔥']

    const response = 'ok'

    const spawn = jest
      .spyOn(childProcess, childProcess.spawn.name)
      .mockReturnValue(response)

    const result = executeSoxCommand(args)

    expect(spawn).toHaveBeenCalledWith('sox', args)
    expect(result).toStrictEqual(response)
  })
})