import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null // 存储当前报错信息
    }
  }
  static getDerivedStateFromError(error) {
    // 更新state 时下一次渲染能够显示降级后的UI
    console.log('getDerivedStateFromError...', error)
    return { error }
  }
  componentDidCatch(error, errorInfo) {
    console.info('componentDidCatch...', error, errorInfo)
  }
  render() {
    if (this.state.error) {
      // 提示错误
      return <h1>报错了</h1>
    }
    // 没有错误 正常渲染
    return this.props.children
  }
}

export default ErrorBoundary