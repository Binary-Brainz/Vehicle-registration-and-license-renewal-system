import { createSlice } from '@reduxjs/toolkit'

const initData = JSON.parse(sessionStorage.getItem("userData"));

const initialState = {
  id: (initData)? initData.id : '',
  nic: (initData)? initData.nic : ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    gotId: (state, action) => {
      state.id = action.payload
    },
    gotNic: (state, action) => {
      state.nic += action.payload
    }
  }
})

export default userSlice.reducer
export const { gotId, gotNic } = userSlice.actions