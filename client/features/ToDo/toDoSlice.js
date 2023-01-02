import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../shared/baseUrl'
import axios from 'axios'

export const fetchToDos = createAsyncThunk('toDos/fetchToDos', async () => {
	const response = await axios.get(baseUrl + 'todos')
	return response.data
})

export const postToDo = createAsyncThunk(
	'toDos/postToDo',
	async (toDoClimb) => {
		try {
			const response = await axios.post(baseUrl + 'todos', toDoClimb)
			return response.data
		} catch (err) {
			console.error(err)
		}
	}
)

export const deleteToDo = createAsyncThunk(
	'toDos/deleteToDo',
	async (toDoClimb) => {
		try {
			const response = await axios.delete(`${baseUrl}todos`, {
				climbId: toDoClimb.climbId,
			})
			return response.data
		} catch (err) {
			console.error(err)
		}
	}
)

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
			.addCase(postToDo.pending, (state) => {
				state.isLoading = true
			})
			.addCase(postToDo.fulfilled, (state, action) => {
				state.isLoading = false
				state.errMess = null
				state.toDosArray.push(action.payload)
			})
			.addCase(postToDo.rejected, (state, action) => {
				state.isLoading = false
				state.errMess = action.error ? action.error.message : 'Post failed'
			})
			.addCase(deleteToDo.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteToDo.fulfilled, (state, action) => {
				state.isLoading = false
				state.errMess = null
				state.toDosArray = state.toDosArray.filter(
					(climb) => climb._id !== action.payload
				)
			})
			.addCase(deleteToDo.rejected, (state, action) => {
				state.isLoading = false
				state.errMess = action.error ? action.error.message : 'Delete failed'
			})
	},
})

export const { addToDo, removeToDo } = toDoSlice.actions
export const toDoReducer = toDoSlice.reducer
