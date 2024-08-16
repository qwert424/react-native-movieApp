import { createSlice } from '@reduxjs/toolkit'
import { getAddressList, addAddressList } from '../api/require'
import { changeLoading } from './loadingSlice'

// 初始化影院地址列表
export const getAddressListAsync = () => async (dispatch) => {
  dispatch(changeLoading(true))
  const response = await getAddressList()
  dispatch(initAddreddList(response))
  dispatch(changeLoading(false))
}
// 模拟下拉刷新影院地址列表
export const addAddressListAsync = () => async (dispatch) => {
  const response = await addAddressList()
  dispatch(addAddreddList(response))
}

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: []
  },
  reducers: {
    initAddreddList: (state, { payload }) => {
      state.addressList = [...payload]
    },
    addAddreddList: (state, { payload }) => {
      state.addressList.unshift(...payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { initAddreddList, addAddreddList } = addressSlice.actions

export default addressSlice.reducer