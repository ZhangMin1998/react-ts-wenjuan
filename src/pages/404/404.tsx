import React, { FC } from 'react'
import classnames from 'classnames'
import styles from './404.module.scss'
import { useNavigate } from 'react-router-dom'

const NotFound:FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.http404}>
        <div className={styles['pic-404']}>
          <img className={classnames(styles['pic-404__parent'])} src={require('../../assets/img/404.png')} alt="404" />
          <img className={classnames(styles['pic-404__child'], styles['left'])} src={require('../../assets/img/404_cloud.png')} alt="404"/>
          <img className={classnames(styles['pic-404__child'], styles['mid'])} src={require('../../assets/img/404_cloud.png')}  alt="404"/>
          <img className={classnames(styles['pic-404__child'], styles['right'])} src={require('../../assets/img/404_cloud.png')}  alt="404"/>
        </div>
        <div className={styles.bullshit}>
          <div className={classnames(styles['bullshit__oops'])}>404 !</div>
          <div className={classnames(styles['bullshit__headline'])}>很抱歉，您访问的页面不存在...</div>
          <div className={styles['bullshit__info']}>请检查您输入的URL是否正确，或者单击下面的按钮返回。</div>
          <div className={styles['bullshit__return-home']} onClick={() => navigate(-1)}>返回</div>
        </div>
      </div>
    </div>
  )
}

export default NotFound