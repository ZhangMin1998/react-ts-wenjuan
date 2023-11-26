import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
// import { produce } from 'immer'

export type ComponentInfoType = {
  fe_id: string // TODO
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string,
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
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
    },
    // 修改 selectedId
    // changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
    //   draft.selectedId = action.payload
    // })
    // // 修改selectedId
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId =  action.payload
    }
  }
})

const componentsReducer = componentsSlice.reducer

export const { resetComponents, changeSelectedId } = componentsSlice.actions

export default componentsReducer