import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../shared/baseUrl'
import axios from 'axios'

export const fetchToDos = createAsyncThunk('toDos/fetchToDos', async () => {
	const response = await axios.get(baseUrl + 'toDos')
	return response.data
})

export const postToDos = createAsyncThunk('toDos/postToDos', async () => {
	const response = await axios.post(baseUrl + 'toDos')
	return response.data
})

const toDoSlice = createSlice({
	name: 'toDo',
	initialState: { isLoading: true, errMess: null, toDosArray: [] },
	reducers: {
		addToDo: (state, action) => {
			state.toDosArray.push(action.payload)
		},
		removeToDo: (state, action) => {
			state.toDosArray = state.toDosArray.filter(
				(climb) => climb !== action.payload
			)
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

export const { addToDo, removeToDo } = toDoSlice.actions
export const toDoReducer = toDoSlice.reducer
