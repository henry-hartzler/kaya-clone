import { createSlice } from '@reduxjs/toolkit'

const sendsSlice = createSlice({
	name: 'sends',
	initialState: [],
	reducers: {
		logSend: (state, action) => {
			const newSend = {
				id: state.length,
				...action.payload,
			}
			state.push(newSend)
		},
		removeSend: (state, action) => {
			const sendToRemove = {
				...action.payload,
			}
			console.log(sendToRemove)
			return state.filter((climb) => climb.id !== sendToRemove.id)
		},
	},
})

export const { logSend, removeSend } = sendsSlice.actions
export const sendsReducer = sendsSlice.reducer
