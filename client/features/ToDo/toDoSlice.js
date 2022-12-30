import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../shared/baseUrl'
import axios from 'axios'

export const fetchToDos = createAsyncThunk('toDos/fetchToDos', async () => {
	const response = await axios.get(baseUrl + 'toDos')
	return response.data
})

const toDoSlice = createSlice({
	name: 'toDo',
	initialState: { isLoading: true, errMess: null, toDosArray: [] },
	reducers: {
		toggleToDo: (state, action) => {
			if (state.toDosArray.includes(action.payload)) {
				return state.toDosArray.filter((climb) => climb !== action.payload)
			} else {
				state.toDosArray.push(action.payload)
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchToDos.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchToDos.fulfilled, (state, action) => {
				state.isLoading = false
				state.errMess = null
				state.toDosArray = action.payload
			})
			.addCase(fetchToDos.rejected, (state, action) => {
				state.isLoading = false
				state.errMess = action.error ? action.error.message : 'Fetch failed'
			})
	},
})

export const { toggleToDo } = toDoSlice.actions
export const toDoReducer = toDoSlice.reducer
