import { createSlice } from '@reduxjs/toolkit'

const toDoSlice = createSlice({
	name: 'toDo',
	initialState: [],
	reducers: {
		toggleToDo: (state, action) => {
			if (state.includes(action.payload)) {
				return state.filter((climb) => climb !== action.payload)
			} else {
				state.push(action.payload)
			}
		},
	},
})

export const { toggleToDo } = toDoSlice.actions
export const toDoReducer = toDoSlice.reducer
