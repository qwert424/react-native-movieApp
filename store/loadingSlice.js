import { createSlice } from '@reduxjs/toolkit'

// loading仓库
export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers: {
        changeLoading: (state, { payload }) => {
            state.isLoading = payload
        },

    }
})

// Action creators are generated for each case reducer function
export const { changeLoading } = loadingSlice.actions

export default loadingSlice.reducer