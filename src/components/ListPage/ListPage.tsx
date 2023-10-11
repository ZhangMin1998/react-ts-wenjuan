import React, { FC, useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const [searchParams] = useSearchParams()

  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { total } = props

  useEffect(() => {
    const pageSize = parseInt(searchParams.get('pageSize') || '') || 10
    const pageNum = parseInt(searchParams.get('pageNum') || '') || 1
    setCurrent(pageNum)
    setPageSize(pageSize)
  }, [searchParams])

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const onChange = (pageNum: number, pageSize:number) => {
    // console.log(pageNum, pageSize, pathname, searchParams)
    searchParams.set('pageNum', pageNum.toString())
    searchParams.set('pageSize', pageSize.toString())
    navigate({
      pathname,
      search: searchParams.toString() // 除了改变pageNum pageSize外 其它的url参数要带着
    })
  }

  return <Pagination current={current} pageSize={pageSize} total={total} onChange={onChange} />
}

export default ListPage