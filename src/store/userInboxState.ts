import { atom } from 'recoil'
//off 表示有红点 on与其他表示有红点
const state_str = localStorage.getItem('inboxPoint') ?? 'on'
export const userInboxPointState = atom({
  key: 'userPointState',
  default: { point: state_str },
})
