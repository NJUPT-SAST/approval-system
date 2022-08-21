import axios from 'axios'
import { competitionInfoType } from '../type/apiTypes'
import { apis } from '.'

//经询问 比赛 与接口文档中的 活动 是同一个东西
//故在该文件内 比赛 字段 指的是接口文档中的 活动 字段

/**
 * 设置比赛信息
 * @param data 见类型定义
 * @return axios对象
 */
export const createCompetitionInfo = (data: competitionInfoType) => {
  return apis({
    method: 'POST',
    url: '/admin/com/create',
    data: {
      ...data,
    },
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
    url: '/admin/com/delete?id=' + competitionId,
  })
}

/**
 * 修改活动信息
 * @comment 接口参数命名那里既有 驼峰法 又有 下划线 ,烂
 * @param competitionId 比赛活动 ID
 * @param data 见类型定义
 * @return axios对象
 */
export const editCompetitionInfo = (competitionId: number, data: competitionInfoType) => {
  return apis({
    method: 'POST',
    url: '/admin/com/edit',
    data: {
      id: competitionId,
      ...data,
    },
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
export const assignJudge = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
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
    url: '/admin/exportFileData?comId=' + competitionId,
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
    url: '/admin/userInfo/' + code,
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
 * 导出附件
 * 导出的附件是个压缩包
 * @param fileId 文件 id
 * @return axios对象
 */

export const exportWorkFile = (fileId: number) => {
  return apis({
    method: 'get',
    url: '/admin/data/exportWork?fileId=' + fileId,
    responseType: 'blob',
  })
}
