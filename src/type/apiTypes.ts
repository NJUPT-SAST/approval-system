export type competitionInfoType = {
  id: number // 比赛id
  name: string // 比赛名称
  reg_begin_time: string // 报名开始时间
  reg_end_time: string // 报名结束时间
  submit_begin_time: string // 活动提交开始时间
  submit_end_time: string // 活动提交结束时间
  review_begin_time: string // 评审开始时间
  review_end_time: string // 评审结束时间
  table: null // 文档中的注释：表单schema，我不知道是啥
  type: number // 0 团队 1 个人
  min_team_members: number // 默认值：1 值：1 团队人数限制
  max_team_members: number // 值：2 团队人数限制
  user_code: number // 值：1 活动负责人id
  is_review: number // 0 <= 值 <= 1 是否已在审批 0 表审批 1 未审批
  review_settings: any // 此处无注释 无类型
  introduce: string // 比赛介绍
}
