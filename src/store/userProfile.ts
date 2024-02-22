import { atom } from 'recoil'
const defaultUserProfile = { code: '', major: '', name: '', college: '', contact: '' }
defaultUserProfile.code = localStorage.getItem('approval-system-code') ?? 'ERROR'
defaultUserProfile.name = localStorage.getItem('approval-system-name') ?? 'ERROR'
defaultUserProfile.major = localStorage.getItem('approval-system-major') ?? 'ERROR'
defaultUserProfile.college = localStorage.getItem('approval-system-college') ?? 'ERROR'
defaultUserProfile.contact = localStorage.getItem('approval-system-contact') ?? 'ERROR'
const userProfileStore = atom({
  key: 'userProfile',
  default: defaultUserProfile,
})
export default userProfileStore
