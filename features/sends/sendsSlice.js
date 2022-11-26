import { createSlice } from "@reduxjs/toolkit"

const sendsSlice = createSlice({
	name: "sends",
	initialState: [],
	reducers: {
		toggleSends: (sends, action) => {
			if (sends.includes(action.payload)) {
				return sends.filter((climb) => climb !== action.payload)
			} else {
				sends.push(action.payload)
			}
		},
	},
})

export const { toggleSends } = sendsSlice.actions
export const sendsReducer = sendsSlice.reducer
