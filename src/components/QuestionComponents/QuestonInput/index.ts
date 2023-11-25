/**
 * @description 问卷 输入框
 * @author zhangmin
 */

import Component from './Component'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput', // 和后端统一好
  Component,
  defaultProps: QuestionInputDefaultProps
}