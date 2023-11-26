import { useSelector } from "react-redux"
import { StateType } from "../store"
import { ComponentsStateType } from "../store/modules/componentsReducer"

function useGetComponentInfo() {
  const components = useSelector<StateType>(state => state.componentsStore) as ComponentsStateType
  
  const { componentList = [] } = components

  return {
    componentList
  }
}

export default useGetComponentInfo