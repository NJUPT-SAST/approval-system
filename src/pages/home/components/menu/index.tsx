import AdminMenu from './AdminMenu'
import ApproveMenu from './ApproveMenu'
import JudgeMenu from './JudgeMenu'
import UnLoginMenu from './UnLoginMenu'
import UserMenu from './UserMenu'
const menuMap = new Map()
menuMap.set('admin', AdminMenu)
menuMap.set('approver', ApproveMenu)
menuMap.set('judge', JudgeMenu)
menuMap.set('offline', UnLoginMenu)
menuMap.set('user', UserMenu)
export default menuMap
