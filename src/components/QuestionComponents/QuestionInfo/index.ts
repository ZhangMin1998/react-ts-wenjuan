/**
 * @description 问卷 info 组件
 * @author zhangmin
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

// Paragraph组件的配置
export default {
  title: '问卷信息',
  type: 'questionInfo', // 和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionInfoDefaultProps
}