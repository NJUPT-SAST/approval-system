import { atom } from 'recoil'
const defaultUserProfile = { code: '', major: '', name: '', faculty: '' }
defaultUserProfile.code = localStorage.getItem('code') ?? 'ERROR'
defaultUserProfile.name = localStorage.getItem('name') ?? 'ERROR'
defaultUserProfile.major = localStorage.getItem('major') ?? 'ERROR'
defaultUserProfile.faculty = localStorage.getItem('faculty') ?? 'ERROR'
const userProfileStore = atom({
  key: 'userProfile',
  default: defaultUserProfile,
})
export default userProfileStore
