import util from 'node:util'
import { exec } from 'node:child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'

const asyncExec = util.promisify(exec)
const { log } = console
const commitData = {
  type: '',
  scope: '',
  subject: '',
}
async function getCommitData() {
  const commitPrompList = [
    {
      type: 'list',
      message: chalk.yellow(`请选择一种coomit提交类型:
                  feat:      添加新功能,
                  fix:       修复bug,
                  refactor:  代码重构,
                  chore:     改变构建流程，新增依赖库、工具、构造工具的或者外部依赖的改动,
                  docs:      只改动了文档相关的内容,
                  style:     不影响代码含义的改动，例如去掉空格、改变缩进、增删分号,
                  perf:      提升性能或者其他和项目有关的优化,
                  test:      添加测试或者修改现有测试,
                  ci:        自动化流程配置修改,
                  misc:      不属于以上任何一个分类
                `),
      name: 'type',
      choices: ['feat', 'fix', 'refactor', 'chore', 'docs', 'style', 'perf', 'test', 'ci', 'misc'],
      pageSize: 14,
      loop: false,
    },
    {
      type: 'input',
      message: chalk.yellow('填写本次commit的影响范围(填写主要受影响的页面或组件等, 可选):'),
      name: 'scope',
    },
    {
      type: 'input',
      message: chalk.yellow('填写本次commit内容的简要说明(必填):'),
      name: 'subject',
      validate(val: string) {
        if (val === '') {
          console.log(chalk.red('\n此项为必填项\n'))
          return false
        }
        if (val.length >= 50) {
          console.log(chalk.red('\n提交说明应尽量简短,不能超过50个字符\n'))
          return false
        }
        return true
      },
    },
  ]
  const { type, scope, subject } = await inquirer.prompt(commitPrompList)
  Object.assign(commitData, {
    type,
    scope,
    subject,
  })
}
async function formatFiles() {
  log(chalk.blue('开始执行代码格式化'))
  const { stdout } = await asyncExec('yarn format')
  log(stdout)
}
async function lintFiles() {
  log(chalk.blue('开始执行eslint校验'))
  const { stdout } = await asyncExec('yarn lint')
  log(stdout)
}
async function gitAdd() {
  try {
    const { stdout } = await asyncExec('git add .')
    log(stdout)
  } catch (error) {
    log(chalk.red('git add执行出错，尝试手动执行'))
    log(chalk.red(error))
    process.exit(1)
  }
}
async function gitCommit() {
  const { type, subject } = commitData
  let { scope } = commitData
  if (scope !== '') {
    scope = `(${scope})`
  }
  try {
    const { stdout } = await asyncExec(`git commit -m "${type}${scope}: ${subject}" -n`)
    log(stdout)
  } catch (error) {
    log(chalk.red('git commit执行出错'))
    log(chalk.red(error))
    process.exit(1)
  }
}
export default {
  prepare: {
    getCommitData,
    formatFiles,
    lintFiles,
  },
  gitCommand: {
    gitAdd,
    gitCommit,
  },
}
