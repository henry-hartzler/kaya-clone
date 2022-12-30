import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../shared/baseUrl'
import axios from 'axios'

export const fetchLocations = createAsyncThunk(
	'locations/fetchLocations',
	async () => {
		const response = await axios.get(baseUrl + 'locations')
		return response.data
	}
)

const locationsSlice = createSlice({
	name: 'locations',
	initialState: { isLoading: true, errMess: null, locationsArray: [] },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLocations.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchLocations.fulfilled, (state, action) => {
				state.isLoading = false
				state.errMess = null
				state.locationsArray = action.payload
			})
			.addCase(fetchLocations.rejected, (state, action) => {
				state.isLoading = false
				state.errMess = action.error ? action.error.message : 'Fetch failed'
			})
	},
})

export const { addLocation } = locationsSlice.actions
export const locationsReducer = locationsSlice.reducer

export const selectAlllocations = (state) => state.locations.locationsArray
export const selectlocationsById = (id) => (state) =>
	state.locations.locationsArray.find((c) => c.id === parseInt(id))
