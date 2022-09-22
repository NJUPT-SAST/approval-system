import axios from 'axios'
import { competitionInfoType } from '../type/apiTypes'
import { apis } from '.'
import qs from 'qs'

//经询问 比赛 与接口文档中的 活动 是同一个东西
//故在该文件内 比赛 字段 指的是接口文档中的 活动 字段

/**
 * 创建比赛信息
 * @param data 见类型定义
 * @return axios对象
 */
export const createCompetitionInfo = (data: competitionInfoType, review_settings: object, cover?: Blob) => {
  const formData = new FormData()
  if (cover) formData.append('cover', cover)
  else formData.append('cover', '')
  formData.append('competition', JSON.stringify({ review_settings: { ...review_settings }, ...data }))
  return apis({
    method: 'POST',
    url: '/admin/com/create',
    data: formData,
  })
}

/**
 * 删除比赛
 * @param competitionId 比赛id
 * @return axios对象
 */
export const deleteCompetitionInfo = (competitionId: number) => {
  return apis({
    method: 'POST',
    url: '/admin/com/delete',
    data: qs.stringify({ comId: competitionId }),
  })
}

/**
 * 修改活动信息
 * @comment 接口参数命名那里既有 驼峰法 又有 下划线 ,烂
 * @param competitionId 比赛活动 ID
 * @param data 见类型定义
 * @return axios对象
 */
export const editCompetitionInfo = (
  competitionId: number,
  data: competitionInfoType,
  review_settings: object,
  cover?: Blob,
) => {
  const formData = new FormData()
  if (cover) formData.append('cover', cover)
  else formData.append('cover', '')
  formData.append(
    'competition',
    JSON.stringify({ id: competitionId, review_settings: { ...review_settings }, ...data }),
  )
  return apis({
    method: 'POST',
    url: '/admin/com/edit',
    data: formData,
  })
}

/**
 * 查看活动信息
 * @return axios对象
 */
export const viewCompetitionInfo = (competitionId: number) => {
  return apis({
    method: 'get',
    url: '/admin/com/competitionInfo?comId=' + competitionId,
  })
}

/**
 * 获取活动列表
 * @param cur 当前页数
 * @param limit 每页数据条数
 * @return axios对象
 */
export const getCompetitionList = (cur: number, limit: number) => {
  return apis({
    method: 'get',
    url: '/admin/com/competitionList?pageNum=' + cur + '&pageSize=' + limit,
  })
}

/**
 * 分配评委
 * @param
 * @return axios对象
 */
export const assignJudge = (formData: FormData) => {
  return apis({
    method: 'POST',
    url: '/admin/judge/assign',
    data: formData,
  })
}

/**
 * 导出作品（分配评委）
 * 导出作品后用于分配评委 导出的是一个 excel 文件
 *  @param competitionId 活动Id
 * @return axios对象
 */
export const exportWorkFileDataToAssignScorer = (competitionId: number) => {
  return apis({
    method: 'get',
    url: '/admin/exportWorkData?comId=' + competitionId,
    responseType: 'blob',
  })
}

/**
 * 查询用户信息
 * @param code 学号
 * @return axios对象
 */
export const getUserInfo = (code: string) => {
  return apis({
    method: 'get',
    url: '/admin/userInfo?code=' + code,
  })
}

/**
 * 导出评审结果
 * @param competitionId 比赛 id
 * @return axios对象
 */
export const exportJudgeResult = (competitionId: number) => {
  return apis({
    method: 'get',
    url: '/admin/data/result?comId=' + competitionId,
    responseType: 'blob',
  })
}

/**
 * 发布公告
 * @param competitionId 比赛 id
 * @param title 公告标题
 * @param content 公告正文
 * @param role 公告接收角色
 * @param time 发布时间 格式为 'yyyy.mm.dd hh:mm' 如果为未来时间将在未来发布
 * @return axios对象
 */
export const releaseNotice = (competitionId: number, title: string, content: string, role: number, time?: string) => {
  return apis({
    method: 'POST',
    url: '/admin/notice/release',
    data: {
      time: time,
      com_id: competitionId,
      title: title,
      content: content,
      role: role,
    },
  })
}

/**
 * 导出材料 所有参赛人员的附件 大概
 * @param competitionId 比赛Id
 * @return axios对象
 */
export const exportTeamInfo = (competitionId: number) => {
  return apis({
    method: 'get',
    url: '/admin/data/exportFile?comId=' + competitionId,
    responseType: 'blob',
  })
}

/**
 * 修改公告
 * 后端接口有问题 后端待修改
 * @param noticeId 公告Id
 * @param title 公告标题
 * @param content 公告正文
 * @param role 公告接收角色
 * @param time 公告发布时间 默认为当前时间 格式为 'yyyy.mm.dd hh:mm'
 * @return axios对象
 */
export const editNotice = (noticeId: number, title: string, content: string, role: number, time?: string) => {
  return apis({
    method: 'POST',
    url: '/admin/notice/edit',
    data: {
      id: noticeId,
      title: title,
      content: content,
      role: role,
      time: time,
    },
  })
}
/**
 * 删除公告
 * @param NoticeId 公告id
 * @returns
 */
export const deleteCompetitionNotice = (NoticeId: number) => {
  return apis({
    method: 'POST',
    url: '/admin/notice/del?id=' + NoticeId,
  })
}

/**
 * 获取管理活动界面的 list
 * @param competitionId 活动Id
 * @param pageNumber 页码
 * @param pageSize 单页最大数据条数
 * @returns Axios对象
 */
export const getManageCompetitionList = (competitionId: number, pageNumber: number, pageSize: number) => {
  return apis({
    method: 'get',
    url: '/admin/com/manager?comId=' + competitionId + '&pageNum=' + pageNumber + '&pageSize=' + pageSize,
  })
}

/**
 * 导出附件
 *
 * @param competitionId 比赛Id
 * @param userCode 队长学号
 * @returns Axios 对象
 */
export const exportWorkFile = (competitionId: number, userCode: string) => {
  return apis({
    method: 'get',
    url: '/admin/data/exportWork?comId=' + competitionId + '&userCode=' + userCode,
    responseType: 'blob',
  })
}
