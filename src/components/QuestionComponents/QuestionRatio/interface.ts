export type OptionType = {
  value: string,
  text: string
}

export type QuestionRatioPropsType = {
  title?: string
  isVertical?: boolean
  options?: Array<OptionType>
  value?: string // 选中值

  onChange?: (newProps: QuestionRatioPropsType) => void
}

export const QuestionRatioDefaultProps: QuestionRatioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' }
  ],
  value: ''
}