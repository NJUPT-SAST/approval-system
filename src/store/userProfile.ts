import { atom } from 'recoil'
const defaultUserProfile = { code: '', major: '', name: '', faculty: '' }
defaultUserProfile.code = localStorage.getItem('approval-system-code') ?? 'ERROR'
defaultUserProfile.name = localStorage.getItem('approval-system-name') ?? 'ERROR'
defaultUserProfile.major = localStorage.getItem('approval-system-major') ?? 'ERROR'
defaultUserProfile.faculty = localStorage.getItem('approval-system-faculty') ?? 'ERROR'
const userProfileStore = atom({
  key: 'userProfile',
  default: defaultUserProfile,
})
export default userProfileStore
