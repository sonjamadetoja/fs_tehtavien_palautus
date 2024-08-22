import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationReset() {
      return ''
    }
  }
})

export const { notificationChange, notificationReset } = notificationSlice.actions
export default notificationSlice.reducer
