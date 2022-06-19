import chalk from 'chalk'
import { exec } from 'node:child_process'
import util from 'node:util'
const asyncExec = util.promisify(exec)
const { log } = console

const pushState = {
  currentBranch: '',
}

export default {
  prepare: {
    async getBranch() {
      //获取当前的开发分支名称
      try {
        const { stdout } = await asyncExec('git rev-parse --abbrev-ref HEAD')
        pushState.currentBranch = stdout.replace('\n', '')
      } catch (error) {
        log(chalk.red('获取当前分支发生错误'))
        log(chalk.red(error))
        process.exit(1)
      }
    },
    async mergeLatestMaster() {
      //与远程master保持同步
      const { currentBranch } = pushState
      try {
        //切换到master分支
        await asyncExec('git checkout master')
      } catch (error) {
        log(chalk.red('git checkout master失败,请检查工作区和暂存区是否有文件没有commit'))
        log(chalk.red(error))
        process.exit(1)
      }

      try {
        //拉取远程的master分支
        await asyncExec('git pull origin master')
      } catch (error) {
        log(error)
        log(
          chalk.red(
            'git pull origin master，原因可能为网络不稳定或者远程master与本地master存在冲突等, 现切换回原开发分支, 随后应手动切换master分支并拉取远程更新',
            error,
          ),
        )
        try {
          //切换回原先分支, git checkout -f会抛弃从远程master拉取的更新
          await asyncExec(`git checkout -f ${currentBranch}`)
          process.exit(1)
        } catch (error) {
          log(chalk.red(`git checkout -f ${pushState.currentBranch}切换回原先开发分支失败`))
          log(chalk.red(error))
          process.exit(1)
        }
      }

      try {
        //切换至原分支
        await asyncExec(`git checkout ${currentBranch}`)
      } catch (error) {
        log(chalk.red(`git checkout ${pushState.currentBranch}切换回原先开发分支失,目前处在master分支`))
        log(chalk.red(error))
        process.exit(1)
      }

      try {
        //合并最新master
        await asyncExec(`git merge master`)
        log(chalk.blue('成功合并master分支, 当前开发分支已和远程master同步'))
      } catch (error) {
        chalk.red(`git merge master执行失败, 原因可能是存在冲突, 请在vscode左侧的git栏中手动解决冲突再执行yarn push`),
          log(chalk.red(error))
        process.exit(1)
      }
    },
  },
  gitCommand: {
    gitPush() {
      //执行git push命令
      const { currentBranch } = pushState
      try {
        asyncExec(`git push --set-upstream origin ${currentBranch} --no-verify`)
        log(chalk.yellow('代码提交成功'))
        log(
          chalk.yellow(
            `当前分支对应的远程仓库地址(ctrl+鼠标点击下方链接可直接在浏览器打开):\n https://github.com/mld-njupt/approval-system/tree/${currentBranch}`,
          ),
        )
      } catch (error) {
        log(chalk.red('git push发生错误'))
        log(chalk.red(error))
        process.exit(1)
      }
    },
  },
}
