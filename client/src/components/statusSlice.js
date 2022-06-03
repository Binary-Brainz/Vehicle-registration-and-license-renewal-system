import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  vehRegDateRes: false,
  vehRegDocDone: false

}

const ststusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    vehRegDateResed: (state) => {
      state.vehRegDateRes = !state.vehRegDateRes
    },
    isVehRegDocDone: (state) => {
      state.vehRegDocDone = !state.vehRegDocDone
    },
  }
})

export default ststusSlice.reducer
export const { vehRegDateResed, isVehRegDocDone } = ststusSlice.actions