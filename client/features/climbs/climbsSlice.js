import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../shared/baseUrl'
import axios from 'axios'

export const fetchClimbs = createAsyncThunk('climbs/fetchClimbs', async () => {
	const response = await axios.get(baseUrl + 'climbs')
	return response.data
})

export const postClimb = createAsyncThunk('climbs/postClimb', async (climb) => {
	try {
		const response = await axios.post(baseUrl + 'climbs', climb)
		return response.data
	} catch (err) {
		console.error(err)
	}
})

const climbsSlice = createSlice({
	name: 'climbs',
	initialState: { isLoading: true, errMess: null, climbsArray: [] },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClimbs.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchClimbs.fulfilled, (state, action) => {
				state.isLoading = false
				state.errMess = null
				state.climbsArray = action.payload
			})
			.addCase(fetchClimbs.rejected, (state, action) => {
				state.isLoading = false
				state.errMess = action.error ? action.error.message : 'Fetch failed'
			})
			.addCase(postClimb.pending, (state) => {
				state.isLoading = true
			})
			.addCase(postClimb.fulfilled, (state, action) => {
				state.isLoading = false
				state.errMess = null
				state.climbsArray.push(action.payload)
			})
			.addCase(postClimb.rejected, (state, action) => {
				state.isLoading = false
				state.errMess = action.error ? action.error.message : 'Post failed'
			})
	},
})

export const { addClimb } = climbsSlice.actions
export const climbsReducer = climbsSlice.reducer

export const selectAllClimbs = (state) => state.climbs.climbsArray
export const selectClimbsById = (id) => (state) =>
	state.climbs.climbsArray.find((c) => c.id === parseInt(id))
