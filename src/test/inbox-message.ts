export type messageType = {
  id: string
  title: string
  content: string
  post: string
  time: string
}

export type inboxMessageType = {
  message: messageType
  isfold: boolean
}

const message1: messageType = {
  id: 'message1',
  title: '复赛通知',
  content: '请各位团队注意:...',
  post: '校大学生科协',
  time: 'Fri Oct 30 2020 22:55:25 GMT+0800 (China Standard Time)',
}
const message2: messageType = {
  id: 'message2',
  title: '评审提醒',
  content: '',
  post: '校大学生科协',
  time: 'Fri Oct 30 2020 22:55:25 GMT+0800 (China Standard Time)',
}
const message3: messageType = {
  id: 'message3',
  title: '比赛取消通知',
  content: '',
  post: '校大学生科协',
  time: 'Fri Oct 30 2020 22:55:25 GMT+0800 (China Standard Time)',
}
const message4: messageType = {
  id: 'message4',
  title: '比赛开始提醒',
  content: '',
  post: '校大学生科协',
  time: 'Fri Oct 30 2020 22:55:25 GMT+0800 (China Standard Time)',
}
const message5: messageType = {
  id: 'message5',
  title: '比赛开始提醒',
  content: '',
  post: '校大学生科协',
  time: 'Fri Oct 30 2020 22:55:25 GMT+0800 (China Standard Time)',
}
const message6: messageType = {
  id: 'message6',
  title: '比赛取消通知',
  content: '',
  post: '校大学生科协',
  time: 'Fri Oct 30 2020 22:55:25 GMT+0800 (China Standard Time)',
}
const message7: messageType = {
  id: 'message7',
  title: '比赛开始提醒',
  content: '',
  post: '校大学生科协',
  time: 'Fri Oct 30 2020 22:55:25 GMT+0800 (China Standard Time)',
}
const message8: messageType = {
  id: 'message8',
  title: '比赛开始提醒',
  content: '',
  post: '校大学生科协',
  time: 'Fri Oct 30 2020 22:55:25 GMT+0800 (China Standard Time)',
}
export const message: messageType[] = [message1, message2, message3, message4, message5, message6, message7, message8]
