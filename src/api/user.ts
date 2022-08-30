import axios from 'axios'
import { apis } from '.'

/**
 * 获取所有比赛列表
 * @param cur 当前页数
 * @param limit 每页数据条数
 * @return axios对象
 */
export const getAllCompetitionList = (cur: number, limit: number) => {
  return apis({
    method: 'GET',
    url: '/user/com/list?cur=' + cur.toString() + '&limit=' + limit.toString(),
  })
}

/**
 * 搜索比赛
 * @param key 搜索关键词
 * @param cur 当前页数
 * @param limit 每页显示的数量
 * @returns axios对象
 */
export const searchCompetition = (key: string, cur: number, limit: number) => {
  return apis({
    method: 'GET',
    url: '/user/com/search?cur=' + cur.toString() + '&limit=' + limit.toString() + '&key=' + key,
  })
}

/**
 * 获取已报名比赛列表
 * @param cur 页数
 * @param limit 每页数据量
 * @return axios对象
 */
export const getSignedCompetitionList = (cur: number, limit: number) => {
  return apis({
    method: 'get',
    url: '/user/com/signList?cur=' + cur.toString() + '&limit=' + limit.toString(),
  })
}

/**
 * 获取比赛详情
 * @param competitionId 比赛 id
 * @returns axios对象
 */
export const getCompetitionInfo = (competitionId: number) => {
  return apis({
    method: 'get',
    url: '/user/com/info/' + competitionId.toString(),
  })
}

/**
 * 获取比赛报名信息
 * @param competitionId 比赛 id
 * @returns axios对象
 */
export const getCompetitionSignInfo = (competitionId: number) => {
  return apis({
    method: 'get',
    url: '/user/com/signInfo/' + competitionId.toString(),
  })
}

/**
 * 报名比赛
 * @comment 吐槽下比赛 Id 和命名（不同接口中）的类型(不同 role 的接口中既有 Integer又有 String）
 * @param competitionId 比赛的Id
 * @param teamName 团队名称
 * @param teamMember 团队成员
 * @returns axios对象
 */
export const signUp = (
  competitionId: number,
  teamName: string | null,
  teamMember: { name: string; code: string }[],
) => {
  return apis({
    method: 'POST',
    url: '/user/com/signUp',
    data: {
      comId: competitionId,
      teamName: teamName,
      teamMember: [...teamMember],
    },
  })
}

/**
 * 获取比赛团队信息
 * @param competitionId 比赛Id
 * @returns axios对象
 */
export const getTeamInfo = (competitionId: number) => {
  return apis({
    method: 'get',
    url: '/user/com/teamInfo/' + competitionId.toString(),
  })
}

/**
 * 上传审批作品
 * @param competitionId 比赛 id
 * @param name 输入框名
 * @param introduce 作品介绍
 * @param file 评审作品 仅允许zip格式
 * @returns axios对象
 */
export const uploadWork = (competitionId: number, input: string, file: File, onProgress: any) => {
  const data = new FormData()
  data.append('id', competitionId.toString())
  data.append('input', input)
  data.append('file', file)
  return apis({
    method: 'POST',
    url: '/user/com/upload',
    data: data,
    onUploadProgress: ({ total, loaded }) => {
      onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file)
    },
  })
}

/**
 * 删除评审作品
 * @param competitionId 比赛Id
 * @returns axios对象
 */
export const deleteWork = (competitionId: number) => {
  const data = new FormData()
  data.append('id', competitionId.toString())
  return apis({
    method: 'POST',
    url: '/user/com/delete',
    data: data,
  })
}

/**
 * 获取已提交作品信息
 * @param competitionId 比赛Id
 * @returns axios对象
 */
export const getWorkInfo = (competitionId: number) => {
  return apis({
    method: 'get',
    url: '/user/com/workInfo/' + competitionId.toString(),
  })
}

/**
 * 获取作品资料表单
 * @param competitionId 比赛Id
 * @returns axios对象
 */
export const getWorkSchema = (competitionId: number) => {
  return apis({
    method: 'get',
    url: '/user/com/schema/' + competitionId.toString(),
  })
}

/**
 * 提交作品资料表单
 * @param competitionId 比赛Id
 * @param data 没写描述
 * @returns axios对象
 */
export const uploadWorkSchema = (competitionId: number, data: any) => {
  return apis({
    method: 'POST',
    url: '/user/com/uploadSchema/' + competitionId.toString(),
    data: {
      data: data,
    },
  })
}

/**
 * 获取当前用户信息
 * @returns axios对象
 */
export const getUserProfile = () => {
  return apis({
    method: 'get',
    url: '/user/profile',
  })
}
