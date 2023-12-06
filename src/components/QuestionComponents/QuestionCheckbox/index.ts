/**
 * @description 问卷 checkbox
 * @author zhangmin
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './interface'

export * from './interface'

// Input组件的配置
export default {
  title: '多选',
  type: 'questionCheckbox', // 和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionCheckboxDefaultProps
}