import childProcess from 'child_process'

export function executeSoxCommand(args) {
  return childProcess.spawn('sox', args)
}