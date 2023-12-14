/**
 * @description 问卷 输入框
 * @author zhangmin
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

// Input组件的配置
export default {
  title: '输入框666',
  type: 'questionInput', // 和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionInputDefaultProps
}