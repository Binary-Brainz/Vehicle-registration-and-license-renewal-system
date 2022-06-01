import { configureStore } from '@reduxjs/toolkit'
import statusSlice from '../components/statusSlice'
import userSlice from '../components/userSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        status: statusSlice,
    }
})

export default store