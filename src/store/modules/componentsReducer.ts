import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from '../utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from '@reduxjs/toolkit'
// import { produce } from 'immer'

export type ComponentInfoType = {
  fe_id: string // 前端生成的id,服务端mongodb不认这种格式，自定义一个fe_id
  type: string
  title: string
  isHidden?: boolean,
  isLocked?: boolean,
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string,
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null
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

    // 修改selectedId
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId =  action.payload
    },
    // 添加新组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent =  action.payload
      // const { selectedId, componentList } = state
      // const index = componentList.findIndex(c => c.fe_id === selectedId)

      // if (index < 0) {
      //   // 未选中任何组件, 直接尾部添加
      //   state.componentList.push(newComponent)
      // } else {
      //   // 选中破了组件 插入到index后面
      //   state.componentList.splice(index + 1, 0, newComponent)
      // }
      // state.selectedId = newComponent.fe_id // 添加新组件后直接选中
      insertNewComponent(state, newComponent)
    },
    // 修改组件属性
    changeComponentProps: (state: ComponentsStateType, action: PayloadAction<{fe_id: string, newProps:ComponentPropsType}>) => {
      const {fe_id, newProps} =  action.payload

      // 找到当前要修改的组件
      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps // 覆盖
        }
      }
    },
    // 删除选中的组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { selectedId: removeId, componentList = [] } = state
    
      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList)
      state.selectedId = newSelectedId
      
      if (!removeId) return
      const index = componentList.findIndex(c => c.fe_id === removeId)
      if (index > -1) componentList.splice(index, 1) // 删除
    },
    // 隐藏/显示组件
    changeComponentHidden: (state: ComponentsStateType, action: PayloadAction<{fe_id: string, isHidden: boolean}>) => {
      const { componentList } = state
      const {fe_id, isHidden} =  action.payload

      // 重新计算selectedId
      let newSelectedId = ''
      if (isHidden) {
        // 要隐藏
        newSelectedId = getNextSelectedId(fe_id, componentList)
      } else {
        // 要显示
        newSelectedId = fe_id
      }
      state.selectedId = newSelectedId

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },
    // 锁定/解锁组件
    toggleComponentLocked: (state: ComponentsStateType, action: PayloadAction<{fe_id: string}>) => {
      const { componentList } = state
      const {fe_id} =  action.payload
      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },
    // 拷贝当前选中的组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent == null) return
      state.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
    },
    // 粘贴组件
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state
      if (copiedComponent == null) return
      copiedComponent.fe_id = nanoid() // 修改fe_id 粘贴后组件de_id保证唯一
      insertNewComponent(state, copiedComponent)
    },
    // 选中上一个
    selecPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectIndex < 0) return // 未选中
      if (selectIndex <= 0) return // 已经选中第一个 无法上移
      state.selectedId = componentList[selectIndex - 1].fe_id
    },
    // 选中下一个
    selecNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectIndex < 0) return // 未选中
      if (selectIndex === componentList.length - 1) return // 已经选中最后一个 无法下移
      state.selectedId = componentList[selectIndex + 1].fe_id
    }
  }
})

const componentsReducer = componentsSlice.reducer

export const { 
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selecPrevComponent,
  selecNextComponent
} = componentsSlice.actions

export default componentsReducer