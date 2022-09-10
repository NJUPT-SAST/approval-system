import { atom } from 'recoil'
//off 表示有红点 on与其他表示有红点
const state_str = localStorage.getItem('inboxPoint') ?? 'on'
const consoleText = () => {
  /* %c
   ______     ______     ______     ______
  /\  ___\   /\  __ \   /\  ___\   /\__  _\
  \ \___  \  \ \  __ \  \ \___  \  \/_/\ \/
   \/\_____\  \ \_\ \_\  \/\_____\    \ \_\
    \/_____/   \/_/\/_/   \/_____/     \/_/
  */
}
function getMultiLine(f: any) {
  const lines = f.toString()
  return lines.substring(lines.indexOf('/*') + 3, lines.lastIndexOf('*/'))
}
console.log(getMultiLine(consoleText), 'color:orange')
console.log(
  '%c⭐️️ 支持我们的项目： https://github.com/NJUPT-SAST/approval-system',
  'color:orange;font-size:20px;font-face',
)

export const userInboxPointState = atom({
  key: 'userPointState',
  default: { point: state_str },
})
