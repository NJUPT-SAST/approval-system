import unLogin from './unLogin'
import admin from './admin'
import approver from './approver'
import judge from './judge'
import user from './user'
import { useRecoilState } from 'recoil'
import { useRoutes } from 'react-router-dom'
import userStateStore from '../store/userState'

function RegisterRouter() {
  const [userState, setUserState] = useRecoilState(userStateStore)
  const unLoginEle = useRoutes(unLogin)
  const adminEle = useRoutes(admin)
  const approverEle = useRoutes(approver)
  const userEle = useRoutes(user)
  const judgeEle = useRoutes(judge)
  const eleMap = new Map()
  eleMap.set('offline', unLoginEle)
  eleMap.set('admin', adminEle)
  //评委
  eleMap.set('approver', approverEle)
  eleMap.set('user', userEle)
  //审批
  eleMap.set('judge', judgeEle)
  return eleMap.get(userState)
}
export default RegisterRouter
