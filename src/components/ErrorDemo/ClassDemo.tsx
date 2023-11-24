import React from 'react'

class ErrorDemo extends React.Component {
  constructor(props:any) {
    super(props)
    this.state = {
        num: 100
    }
  }
  clickHandler = () => {
    // this.state.num() // ErrorBoundary 无法监听DOM事件报错，需要自行 try-catch、window.onerror
  }
  componentDidMount() {
    // throw new Error('mounted error') // ErrorBoundary 可监听渲染过程的报错

    // setTimeout(() => { // 无法监听异步报错，会直接抛出
    //     throw new Error('setTimeout error')
    // }, 1000)
  }
  render() {
    return <div>
      <p>error demo - class</p>
      <button onClick={this.clickHandler}>error</button>
    </div>
  }
}

export default ErrorDemo
