import { createSlice } from '@reduxjs/toolkit'
import { getNewMovies, addTwoMovieList, getMoviesByPage, getHotLabel } from '../api/require'
import { changeLoading } from './loadingSlice'

// 初始化电影数据
export const getMovieListAsync = (type, length, isNew = false) => async (dispatch) => {
  dispatch(changeLoading(true))
  const response = await getNewMovies(type, length, isNew)
  dispatch(getMovieList({ response, type, isNew }))
  dispatch(changeLoading(false))
}
// 下拉刷新 添加电影数据
export const addMovieListAsync = (type) => async (dispatch) => {
  const response = await addTwoMovieList(type)
  dispatch(addMovieList({ response, type }))
}

// 上拉刷新 添加电影数据
export const MovieListByPageAsync = (page, count, type) => async (dispatch) => {
  const response = await getMoviesByPage(page, count, type)
  dispatch(addMovieByPage({ response, type }))
}

// 获取热门标签
export const getHotLabelAsync = () => async (dispatch) => {
  dispatch(changeLoading(true))
  const response = await getHotLabel()
  dispatch(initHotLabel(response))
  dispatch(changeLoading(false))
}
// 电影数据仓库
export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    newMovieList: [],
    hotMovieList: [],
    soonMovieList: [],
    hotLabel: [],
  },
  reducers: {
    getMovieList: (state, { payload }) => {
      const { response, type, isNew } = payload;
      if (type === 'coming') {
        state.soonMovieList = response
      } else if (isNew) {
        state.newMovieList = response
      } else {
        state.hotMovieList = response
      }
    },
    addMovieList: (state, { payload }) => {
      const { response, type } = payload;
      if (type === 'coming') {
        state.soonMovieList.unshift(...response)
      } else if (type === 'hot') {
        state.hotMovieList.unshift(...response)
      } else {
        state.newMovieList.unshift(...response)
      }
    },
    addMovieByPage: (state, { payload }) => {
      const { response, type } = payload;
      if (type === 'coming') {
        state.soonMovieList.push(...response)
      } else if (type === 'hot') {
        state.hotMovieList.push(...response)
      } else {
        state.newMovieList.push(...response)
      }
    },
    initHotLabel: (state, { payload }) => {
      state.hotLabel = payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { getMovieList, addMovieList, addMovieByPage, initHotLabel } = movieSlice.actions

export default movieSlice.reducer