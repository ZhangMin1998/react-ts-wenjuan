/**
 * @description 问卷 标题
 * @author zhangmin
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// Title组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionTitleDefaultProps
}