import { atom } from 'recoil'

const defaultState = localStorage.getItem('userState') ? localStorage.getItem('userState') : 'offline'
const userStateStore = atom({
  key: 'userState',
  default: defaultState,
})
export default userStateStore
