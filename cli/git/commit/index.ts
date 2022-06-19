import commitManager from './commitManager'
const { getCommitData, formatFiles, lintFiles } = commitManager.prepare
await getCommitData()
await formatFiles()
await lintFiles()
const { gitAdd, gitCommit } = commitManager.gitCommand
await gitAdd()
await gitCommit()
