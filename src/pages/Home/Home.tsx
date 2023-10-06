import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Home: FC = () => {
  const navigate = useNavigate()

  const clickLogin = () => {
    navigate('/login')
  }

  return (
    <div>
      <p>home</p>
      <div>
        <button onClick={clickLogin}>登录</button>
        <Link to='/register?a=10'>注册</Link>
      </div>
    </div>
  )
}

export default Home