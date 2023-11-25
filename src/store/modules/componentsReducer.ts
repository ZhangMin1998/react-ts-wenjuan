import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'

export type ComponentInfoType = {
  fe_id: string // TODO
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  componentList: []
}

const componentsSlice = createSlice({
  name: 'components', // 模块名唯一

  // 初始数据
  initialState: INIT_STATE,

  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    }
  }
})

const componentsReducer = componentsSlice.reducer

export const { resetComponents } = componentsSlice.actions

export default componentsReducer