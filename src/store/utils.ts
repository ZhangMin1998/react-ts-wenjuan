import { ComponentInfoType } from "./modules/componentsReducer";

/**
 * 获取下一个id
 * @param fe_id 当前的id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const index = componentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''

  // 重新计算selectedId
  let newSelectedId = ''
  const length = componentList.length
  if (length < 2) {
    // 组件长度就一个，被删除，就没了
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      // 要删除最后一个, 选中上一个
      newSelectedId = componentList[index - 1].fe_id
    } else {
      // 要删除的不是最后一个，删除以后，选中下一个
      newSelectedId = componentList[index + 1].fe_id
    }
  }
  return newSelectedId
}