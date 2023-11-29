/**
 * @description 问卷 段落
 * @author zhangmin
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

// Paragraph组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', // 和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionParagraphDefaultProps
}