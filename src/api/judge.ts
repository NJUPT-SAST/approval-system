import axios from 'axios'
import { apis } from '.'

/**
 * 提交作品审核列表
 * @param workId 作品 id
 * @param accept 是否通过 值为 true 或 false (接口文档里类型标的是integer?
 * @param opinion 对通过情况的说明
 * @return axios 对象
 */
export const uploadWorkJudgeInfo = (workId: number, accept: boolean, opinion: string) => {
  const data = new FormData()
  data.append('id', workId.toString())
  data.append('accept', accept.toString())
  data.append('opinion', opinion)
  return apis({
    method: 'POST',
    url: '/review/upload',
    data: data,
  })
}

/**
 * 获取审核比赛列表
 * @param page 当前页数
 * @return axios 对象
 */
export const getJudgeCompetitionList = (page: number) => {
  const data = new FormData()
  data.append('page', page.toString())
  return apis({
    method: 'get',
    url: '/review/competition-list?page=' + page,
    data: data,
  })
}

/**
 * 获取审核作品列表
 * @param comId 比赛 id
 * @param page 当前页数
 * @return axios 对象
 */
export const getJudgeWorkList = (comId: number, page: number) => {
  const data = new FormData()
  data.append('comId', comId.toString())
  data.append('page', page.toString())
  return apis({
    method: 'get',
    url: '/review/program-list?comId=' + comId + '&page=' + page,
    data: data,
  })
}

/**
 * 获取审核作品信息
 * @param workId 作品id
 * @return axios 对象
 */
export const getJudgeWorkInfo = (workId: number) => {
  const data = new FormData()
  if (workId === undefined) {
    workId = 1
  }
  data.append('id', workId!.toString())
  return apis({
    method: 'get',
    url: '/review/program-info?id=' + workId,
    data: data,
  })
}

/**
 * 获取评分比赛列表
 * @param page 当前页数
 * @return axios 对象
 */
export const getScoreCompetitionList = (page: number) => {
  const data = new FormData()
  data.append('page', page.toString())
  return apis({
    method: 'get',
    url: '/score/competition-list?page=' + page,
    data: data,
  })
}

/**
 * 获取评分作品列表
 * @param comId 比赛 id
 * @param page 当前页数
 * @return axios 对象
 */
export const getScoreWorkList = (comId: number, page: number) => {
  const data = new FormData()
  data.append('comId', comId.toString())
  data.append('page', page.toString())
  return apis({
    method: 'get',
    url: '/score/program-list?comId=' + comId + '&page=' + page,
    data: data,
  })
}

/**
 * 获取评分作品信息
 * @param workId 作品id
 * @return axios 对象
 */
export const getScoreWork = (workId: number) => {
  const data = new FormData()
  if (workId === undefined) {
    workId = 1
  }
  data.append('id', workId!.toString())
  return apis({
    method: 'get',
    url: '/score/program-info?id=' + workId,
    data: data,
  })
}
/**
 * 获取评分作品总数
 * @param workId 作品id
 * @return axios 对象
 */
export const getScoreWorkTotal = (workId: number) => {
  const data = new FormData()
  data.append('id', workId.toString())
  return apis({
    method: 'get',
    url: '/score/program-info?id=' + workId,
    data: data,
  })
}

/**
 * 提交作品评分信息
 * @param workId 作品 id
 * @param score 评的分 0 ~ 100
 * @param opinion 评价
 * @return axios 对象
 */
export const uploadWorkScoreInfo = (workId: number, score: number, opinion: string) => {
  const data = new FormData()
  data.append('id', workId.toString())
  data.append('score', score.toString())
  data.append('opinion', opinion)
  return apis({
    method: 'POST',
    url: '/score/upload',
    data: data,
  })
}

/**
 * 审核红点
 * @return axios 对象
 */
export const judgePoint = () => {
  return apis({
    method: 'get',
    url: '/review/red-point',
  })
}

/**
 * 评分红点
 * @return axios 对象
 */
export const scorePoint = () => {
  return apis({
    method: 'get',
    url: '/score/red-point',
  })
}
