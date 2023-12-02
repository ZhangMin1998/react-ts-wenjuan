/**
 * @description 问卷 radio
 * @author zhangmin
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'

export * from './interface'

// Input组件的配置
export default {
  title: '单选',
  type: 'questionRadio', // 和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionRadioDefaultProps
}