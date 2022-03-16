import { describe, expect, jest, test } from '@jest/globals'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { join } from 'path'
import config from '../../../server/config.js'
import { Service } from '../../../server/service.js'
import TestUtil from '../../utils/index.js'

const { dir: { publicDirectory } } = config

describe('#Service', () => {
  test('it should return a readStream when call createFileStream', () => {
    const service = new Service()

    const mockFileStream = TestUtil.generateReadableStream(['data'])

    const fileName = 'fileName.txt'

    jest
      .spyOn(fs, fs.createReadStream.name)
      .mockReturnValueOnce(mockFileStream)

    const result = service.createFileStream(fileName)

    expect(fs.createReadStream).toHaveBeenCalledWith(fileName)
    expect(result).toStrictEqual(mockFileStream)
  })

  test('it should return type and path when call getFileInfo', async () => {
    const service = new Service()

    const fileName = 'fileName.txt'

    const fullFilePath = join(publicDirectory, fileName)
    const fileType = '.txt'

    jest
      .spyOn(fsPromises, fsPromises.access.name)
      .mockReturnValueOnce()

    const result = await service.getFileInfo(fileName)

    expect(fsPromises.access).toHaveBeenCalledWith(fullFilePath)
    expect(result).toStrictEqual({
      type: fileType,
      path: fullFilePath
    })
  })

  test('it should return type and stream when call getFileStream', async () => {
    const service = new Service()

    const fileName = 'fileName.txt'
    const type = '.txt'
    const path = '/public/fileName.txt'

    const mockFileStream = TestUtil.generateReadableStream(['data'])

    jest
      .spyOn(service, service.getFileInfo.name)
      .mockReturnValueOnce({ type, path })

    jest
      .spyOn(service, service.createFileStream.name)
      .mockReturnValueOnce(mockFileStream)

    const result = await service.getFileStream(fileName)

    expect(service.getFileInfo).toHaveBeenCalledWith(fileName)
    expect(service.createFileStream).toHaveBeenCalledWith(path)
    expect(result).toStrictEqual({
      type: type,
      stream: mockFileStream
    })
  })
})