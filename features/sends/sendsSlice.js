import { createSlice } from '@reduxjs/toolkit'

const sendsSlice = createSlice({
	name: 'sends',
	initialState: [],
	reducers: {
		toggleSends: (state, action) => {
			if (state.some((e) => e.id === action.payload)) {
				return state.filter((climb) => climb.id !== action.payload.id)
			} else {
				// state.push(action.payload)
			}
		},
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

export const { toggleSends, logSend, removeSend } = sendsSlice.actions
export const sendsReducer = sendsSlice.reducer
