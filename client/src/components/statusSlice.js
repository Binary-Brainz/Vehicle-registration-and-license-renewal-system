import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  vehRegDateRes: false,

}

const ststusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    vehRegDateResed: (state) => {
      state.vehRegDateRes = !state.vehRegDateRes
    },

  }
})

export default ststusSlice.reducer
export const { vehRegDateResed } = ststusSlice.actions