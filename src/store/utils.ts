import { ComponentInfoType, ComponentsStateType } from "./modules/componentsReducer";

/**
 * 获取下一个id
 * @param fe_id 当前的id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''

  // 重新计算selectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length < 2) {
    // 组件长度就一个，被删除，就没了
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      // 要删除最后一个, 选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 要删除的不是最后一个，删除以后，选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}

/**
 * 插入新组件
 * @param state 
 * @param newComponent // 新组件
 */
export function insertNewComponent(state: ComponentsStateType, newComponent:ComponentInfoType ) {
  const { selectedId, componentList } = state
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) {
    // 未选中任何组件, 直接尾部添加
    state.componentList.push(newComponent)
  } else {
    // 选中了组件 插入到index后面
    state.componentList.splice(index + 1, 0, newComponent)
  }
  state.selectedId = newComponent.fe_id // 添加新组件后直接选中
}