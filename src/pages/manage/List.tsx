import React, { FC, useState, useEffect, useRef, useMemo } from 'react'
import styles from './common.module.scss'
import { Typography, Spin, Empty  } from 'antd'
import Card from '../../components/Card/Card'
import ListSearch from '../../components/ListSearch/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/request'
// import { useRequest } from 'ahooks'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
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
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams() // url里面有keyword
  const keyword = searchParams.get('keyword') || ''

  const [started, setStarted] = useState(false) // 标记是否已经开始加载

  // 监听 keyword 变化时重置信息
  useEffect(() => {
    setPageNum(1)
    setList([])
    setTotal(0)
    setStarted(false)
  }, [keyword])

  // 触发加载
  // const tryLoadMore = () => {
  //   console.log('loadMore...')
  // }
  // 尝试触发加载 防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      // console.log(bottom, window.innerHeight)
      
      if (bottom <= window.innerHeight) { // div底部距离页面顶部的距离小于视口的高度 说明全部露出来了
        console.log('执行加载')
        load() //  真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000,
    },
  )
  // 真正加载
  const {run:load, loading} = useRequest(async () => {
    const data = await getQuestionListService({
      pageNum,
      pageSize: 10,
      keyword: searchParams.get('keyword') || ''
    })
    return data
  },{
    manual: true,
    onSuccess: (result, params) => {
      console.log(result)
      const { list: newList = [], total = 0 } = result
      setList(list.concat(newList)) // 累加
      setTotal(total)
      setPageNum(pageNum + 1)
    }
  })

  // 1.当页面加载、或者url的keyword改变时，触发加载
  useEffect(() => {
    tryLoadMore() // 加载第一页 初始化
  },[searchParams])
  // 2.页面滚动时，触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore) // 解绑事件！！！
    }
  },[searchParams, haveMoreData])

  // loadMore Elem
  const loadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin size="large"/> // 让loading效果提前一点出来 因为用了防抖
    if (!total) return <Empty description='暂无数据' />
    if (!haveMoreData) return <span>全部数据加载完成</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])

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
      {/* <div style={{height: '1000px'}}></div> */}
      {/* {loading && ( // loading效果
        <div style={{textAlign: 'center'}}>
          <Spin size="large" />
        </div>
      )} */}
      {/* 问卷列表 */}
      {
        (list.length > 0) && list.map((item: any) => {
          const { _id } = item
          return <Card key={_id} {...item} />
        })
      }
    </div>

    <div className={styles.footer}>
      <div ref={containerRef}>
        {loadMoreContentElem}
      </div>
    </div>
   </>
  )
}

export default List