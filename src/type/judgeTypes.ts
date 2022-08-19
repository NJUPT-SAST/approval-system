// 表格数据类型
export interface DataType {
  total: number // 总的数据条数
  list: [] // 获取的数据列表
  pageNum: number // 当前页码
  pageSize: number // 一页的数据条数
  pages: number // 总页数
  isFirstPage: boolean // 第一页
  isLastPage: boolean // 最后一页
}
export interface DataListType {
  id: number // id
  title: string // 比赛名称
  totalNum: number // 比赛总数
  completedNum: number // 已经完成的数目
  start_date: string // 比赛开始时间
  end_date: string // 比赛结束时间
}
