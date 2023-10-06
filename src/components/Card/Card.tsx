import React, { FC } from 'react'
import styles from './Card.module.scss'

type PropsType = {
  _id: string,
  title: string,
  isPublished: boolean,
  isStar: boolean,
  answerCount: number,
  cteateAt: string
}

const Card: FC<PropsType> = (props: PropsType) => {
  const { _id } = props
  return (
   <>
    <p>Card {_id}</p>
   </>
  )
}

export default Card