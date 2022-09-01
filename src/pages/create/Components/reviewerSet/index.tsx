import React from 'react'
import { Input, Select } from 'antd'

type reviewSetPropsType = {
  value: { key: number; value: string }
  index: number
  setKey: (index: number, key: number) => void
  setValue: (index: number, value: string) => void
}
const a = [
  '通信与信息工程学院',
  '电子与光学工程学院、柔性电子 （未来技术）学院',
  '集成电路科学与工程学院',
  '计算机学院、软件学院、网络空间安全学院',
  '信息材料与纳米技术研究院、材料科学与工程学院',
  '自动化学院、人工智能学院',
  '材料与工程学院',
  '化学与生命科学学院',
  '物联网学院',
  '地理与生物信息学院',
  '现代邮政学院',
  '传媒与艺术学院',
  '管理学院',
  '经济学院',
  '马克思主义学院',
  '社会与人口学院',
  '外国语学院',
  '教育科学与技术学院',
  '贝尔英才学院',
  '海外教育学院',
]
const ReviewSet: React.FC<reviewSetPropsType> = (props) => {
  const { value, index, setKey, setValue } = props
  const { Option } = Select
  return (
    <div className="activity-create-reviewer-setting">
      <div className="activity-create-reviewer-setting-code">
        <span id="activity-create-reviewer-setting-code">审批者学号</span>
        <Input
          className="first"
          placeholder="审批者学号"
          value={value.value}
          onChange={(e) => {
            setValue(index, e.target.value)
          }}
          showCount={false}
        />
      </div>
      <div className="activity-create-reviewer-setting-faculty">
        <span id="activity-create-reviewer-setting-faculty">审批学院代号</span>
        {value.key === -1 ? (
          <Select
            className="last"
            showSearch
            placeholder="负责的审批的学院"
            onSelect={(value: number) => setKey(index, value)}
            filterOption={(input, option) =>
              (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {a.map((value, index) => {
              return (
                <Option key={value + index} value={index + 1}>
                  {value}
                </Option>
              )
            })}
          </Select>
        ) : (
          <Select
            className="last"
            value={value.key}
            showSearch
            placeholder="负责的审批的学院"
            onSelect={(value: number) => setKey(index, value)}
            filterOption={(input, option) =>
              (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {a.map((value, index) => {
              return (
                <Option key={value + index} value={index + 1}>
                  {value}
                </Option>
              )
            })}
          </Select>
        )}
      </div>
    </div>
  )
}

export default ReviewSet
