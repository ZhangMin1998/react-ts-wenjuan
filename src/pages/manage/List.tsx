import React, { FC, useState, useEffect } from 'react'
import styles from './common.module.scss'
import { Typography, Spin  } from 'antd'
import Card from '../../components/Card/Card'
import ListSearch from '../../components/ListSearch/ListSearch'
import { useSearchParams } from 'react-router-dom'
// import { getQuestionListService } from '../../services/request'
// import { useRequest } from 'ahooks'
import { useTitle, useDebounceFn } from 'ahooks'
// import useLoadQuestionDataList from '../../hooks/useLoadQuestionListData'

const { Title } = Typography

const List: FC = () => {
  useTitle('妞妞问卷 - 我的问卷')
  // const [searchParams] = useSearchParams()
  // console.log('aaa', searchParams.get('aaa'))
  

  // const [list, setList] = useState([
  //   // { _id: 'q1', title: '问题1', isPublished: false, isStar: false, answerCount: 5, createdAt: '3月10日 13:24' },
  //   // { _id: 'q2', title: '问题2', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
  //   // { _id: 'q3', title: '问题3', isPublished: false, isStar: false, answerCount: 5, createdAt: '3月10日 13:24' },
  //   // { _id: 'q4', title: '问题4', isPublished: true, isStar: false, answerCount: 5, createdAt: '3月10日 13:24' }
  // ])
  // const [total, setTotal] = useState(0)

  // useEffect(() => {         // 异步函数无法直接在useEffect使用
  //   async function load() {
  //     const data = await getQuestionListService()
  //     console.log('data66', data)
  //     setList(data.list)
  //     setTotal(data.total)
  //   }
  //   load()
  // }, [])

  // 使用useRequest替换上面的
  // const { data = {}, loading } = useRequest(getQuestionListService) // 被下面代替
  // const { data = {}, loading } = useLoadQuestionDataList()
  // const { list = [], total = 0 } = data

  // 不用useLoadQuestionDataList 了  要做上拉加载了
  const [pageNum, setPageNum] = useState(1) // List内部的数据 不在url参数中体现
  const [list, setList] = useState([]) // 全部的列表数据，上拉加载更多 累计
  const [total, setTotal] = useState(0) // 数据库总数
  // const [loading, setLoading] = useState(false)
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams() // url里面有keyword

  // 触发加载
  // const tryLoadMore = () => {
  //   console.log('loadMore...')
  // }
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      console.log('loadMore...')
    },
    {
      wait: 100,
    },
  )
  // 1.当页面加载、或者url的keyword改变时，触发加载
  useEffect(() => {
    tryLoadMore()
  },[searchParams])
  // 2.页面滚动时，触发加载
  useEffect(() => {
    // if (haveMoreData) {
    //   window.addEventListener('scroll', tryLoadMore)
    // }
    window.addEventListener('scroll', tryLoadMore)
    return () => {
      window.removeEventListener('scroll', tryLoadMore) // 解绑事件！！！
    }
  },[searchParams])

  return (
   <>
    <div className={styles.header}>
      <div className={styles.left}>
        <Title level={3}>我的问卷</Title>
      </div>
      <div className={styles.right}>
        <ListSearch />
      </div>
    </div>

    <div className={styles.content}>
      {/* {loading && (
        <div style={{textAlign: 'center'}}>
          <Spin size="large" />
        </div>
      )} */}
      {/* 问卷列表 */}
      <div style={{height: '1000px'}}></div>
      {
        (list.length > 0) && list.map((item: any) => {
          const { _id } = item
          return <Card key={_id} {...item} />
        })
      }
    </div>

    <div className={styles.footer}>loadMore...</div>
   </>
  )
}

export default List