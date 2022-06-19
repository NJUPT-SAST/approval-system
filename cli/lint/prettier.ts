import { exec } from 'child_process'
import chalk from 'chalk'

const { log } = console

const generatePrettierCommand = (lintPathList: string[]): string => {
  let command = ''
  for (let i = 0; i < lintPathList.length; i++) {
    const lintPath = lintPathList[i]
    if (i !== lintPathList.length - 1) {
      command += `prettier --config .prettierrc --write ${lintPath} && `
    } else {
      command += `prettier --config .prettierrc --write ${lintPath}`
    }
  }
  return command
}

const command = generatePrettierCommand(['src/*.{tsx,ts}', 'src/*/**/*.{tsx,ts}'])

exec(command, (error, stdout: string, stderr: string) => {
  if (error && error.code !== 2) {
    log(chalk.red(stdout))
    log(chalk.red(stderr))
    process.exit(error.code)
  }
  log(stdout)
  log(stderr)
})
