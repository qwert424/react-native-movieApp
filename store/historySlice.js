import { createSlice } from '@reduxjs/toolkit'

// 想看、看过数据库
export const historySlice = createSlice({
  name: 'history',
  initialState: {
    loveList: [],
    collectList: [],
    searchLogList: []
  },
  reducers: {
    addLove: (state, { payload }) => {
      state.loveList.push(payload)
    },
    addCollect: (state, { payload }) => {
      state.collectList.push(payload)
    },
    removeLove: (state, { payload }) => {
      state.loveList = state.loveList.filter(item => item !== payload)
    },
    removeCollect: (state, { payload }) => {
      state.collectList = state.collectList.filter(item => item !== payload)
    },
    addSearchLogList: (state, { payload }) => {
      const { hotLabelTitle } = payload
      const arr = state.searchLogList.filter(item => item.hotLabelTitle === hotLabelTitle)
      // 避免重复添加
      if (arr.length !== 0) {
        return
      }
      state.searchLogList.unshift(payload)
    },
    removeSearchLogList: (state, { payload }) => {
      state.searchLogList = state.searchLogList.filter(item => item.hotLabelTitle !== payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addLove, addCollect, removeLove, removeCollect, addSearchLogList, removeSearchLogList } = historySlice.actions

export default historySlice.reducer