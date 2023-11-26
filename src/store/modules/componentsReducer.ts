import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
// import { produce } from 'immer'

export type ComponentInfoType = {
  fe_id: string // 前端生成的id,服务端mongodb不认这种格式，自定义一个fe_id
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
    },
    // 添加新组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent =  action.payload
      const { selectedId, componentList } = state
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      if (index < 0) {
        // 未选中任何组件, 直接尾部添加
        state.componentList.push(newComponent)
      } else {
        // 选中破了组件 插入到index后面
        state.componentList.splice(index + 1, 0, newComponent)
      }
      state.selectedId = newComponent.fe_id // 添加新组件后直接选中
    },
  }
})

const componentsReducer = componentsSlice.reducer

export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions

export default componentsReducer