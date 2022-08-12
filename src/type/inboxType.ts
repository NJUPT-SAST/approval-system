export type inboxMessagePropsType = {
  localIndex: number
  index: number
  readState: boolean
  foldState: boolean
  allChildState: { read: boolean; fold: boolean }[]
  controlAllReadState: (messageReadState: boolean) => void
  controlAllFoldState: (messageFoldState: boolean) => void
  controlChildState: (localindex: number, newReadState: boolean, newFoldState: boolean) => void
}
