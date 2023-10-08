import React, { FC, useState } from 'react'
import type { ChangeEvent } from 'react'
import styles from './ListSearch.module.scss'
import { Input } from 'antd'

const { Search } = Input

const ListSearch: FC = () => {
  // 受控组件
  const [value, setValue] = useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }
  const handleSearch = (value: string) => {
    console.log('value:', value)
  }
  return (
    <div>
      <Search placeholder="请输入" style={{width: '220px'}} value={value} onChange={handleChange} onSearch={handleSearch} allowClear enterButton />
    </div>
  )
}

export default ListSearch