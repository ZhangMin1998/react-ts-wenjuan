import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserStateType = {
  username: string
}

const INIT_STATE: UserStateType = {
  username: ''
}

const userSlice = createSlice({
  name: 'user', // 模块名唯一

  // 初始数据
  initialState: INIT_STATE,

  reducers: {
    loginReducer (state: UserStateType, action: PayloadAction<UserStateType>) {
      return action.payload // 设置username
    },
    logoutReducer: () => INIT_STATE
  }
})

const userReducer = userSlice.reducer

export const { loginReducer, logoutReducer } = userSlice.actions

export default userReducer