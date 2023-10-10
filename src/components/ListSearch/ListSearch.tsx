import React, { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import styles from './ListSearch.module.scss'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

const { Search } = Input

const ListSearch: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  // 受控组件
  const [value, setValue] = useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }
  const handleSearch = (value: string) => {
    // console.log('value:', value)
    navigate({
      pathname,
      search: `keyword=${value}`
    })
  }

  useEffect(() => {
    const newVal = searchParams.get('keyword') || ''
    setValue(newVal)
  }, [searchParams])

  return (
    <div>
      <Search placeholder="请输入" style={{width: '220px'}} value={value} onChange={handleChange} onSearch={handleSearch} allowClear enterButton />
    </div>
  )
}

export default ListSearch