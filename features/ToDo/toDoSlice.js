import { createSlice } from "@reduxjs/toolkit"

const toDoSlice = createSlice({
	name: "toDo",
	initialState: [],
	reducers: {
		addToDo: (toDo, action) => {
			if (toDo.includes(action.payload)) {
				return toDo.filter((climb) => climb !== action.payload)
			} else {
				toDo.push(action.payload)
			}
		},
	},
})

export const { addToDo } = toDoSlice.actions
export const toDoReducer = toDoSlice.reducer
