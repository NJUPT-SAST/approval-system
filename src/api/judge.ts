import axios from 'axios'

axios.interceptors.request.use((config: any) => {
  if (localStorage.getItem('token') !== null) {
    config.headers['Token'] = localStorage.getItem('token')
  }
  return config
})

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
  return axios({
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
  return axios({
    method: 'get',
    url: '/review/competition-list',
    data: data,
  })
}

/**
 * 获取审核作品列表
 * @param competitionId 比赛 id
 * @param page 当前页数
 * @return axios 对象
 */
export const getJudgeWorkList = (competitionId: number, page: number) => {
  const data = new FormData()
  data.append('comId', competitionId.toString())
  data.append('page', page.toString())
  return axios({
    method: 'get',
    url: '/review/program-list',
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
  data.append('id', workId.toString())
  return axios({
    method: 'get',
    url: '/review/program-info',
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
  return axios({
    method: 'get',
    url: '/score/competition-list',
    data: data,
  })
}

/**
 * 获取评分作品列表
 * @param competitionId 比赛 id
 * @param page 当前页数
 * @return axios 对象
 */
export const getScoreWorkList = (competitionId: number, page: number) => {
  const data = new FormData()
  data.append('comId', competitionId.toString())
  data.append('page', page.toString())
  return axios({
    method: 'get',
    url: '/score/program-list',
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
  data.append('id', workId.toString())
  return axios({
    method: 'get',
    url: '/score/program-info',
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
  return axios({
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
  return axios({
    method: 'get',
    url: '/review/red-point',
  })
}

/**
 * 评分红点
 * @return axios 对象
 */
export const scorePoint = () => {
  return axios({
    method: 'get',
    url: '/score/red-point',
  })
}
