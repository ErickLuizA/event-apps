import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const currentDir = dirname(
  fileURLToPath(import.meta.url)
)

const root = join(currentDir, '../')

const audioDirectory = join(root, 'audio')
const publicDirectory = join(root, 'public')
const songsDirectory = join(root, 'songs')
const fxDirectory = join(root, 'fx')

export default {
  port: process.env.PORT || 3000,
  dir: {
    root,
    publicDirectory,
    audioDirectory,
    songsDirectory,
    fxDirectory
  },
  pages: {
    homeHTML: 'home/index.html',
    controllerHTML: 'controller/index.html'
  },
  location: {
    home: '/home'
  },
  constants: {
    CONTENT_TYPE: {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript'
    }
  }
}