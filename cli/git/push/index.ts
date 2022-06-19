import pushManager from './pushManager'
const { getBranch, mergeLatestMaster } = pushManager.prepare
await getBranch()
await mergeLatestMaster()

const { gitPush } = pushManager.gitCommand
await gitPush()
