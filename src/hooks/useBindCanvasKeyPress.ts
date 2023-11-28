import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { 
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selecPrevComponent,
  selecNextComponent
} from '../store/modules/componentsReducer'

/**
 * 判断activeElem是否合法 不能在使用输入框的时候使用
 */
function isActiveElementValid() {
  const activeElem = document.activeElement
  if (activeElem === document.body) return true // 光标没有focus到input
  return false
}

function useBindCanvasKeyPress () {
  const dispatch = useDispatch()

  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  // 选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selecPrevComponent())
  })

  // 选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selecNextComponent())
  })

  // TODO 撤销 重做
}

export default useBindCanvasKeyPress