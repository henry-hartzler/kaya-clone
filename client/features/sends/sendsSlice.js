import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../shared/baseUrl'
import axios from 'axios'

export const fetchSends = createAsyncThunk('sends/fetchSends', async () => {
	const response = await axios.get(baseUrl + 'sends')
	return response.data
})

export const postSend = createAsyncThunk('sends/postSend', async (send) => {
	try {
		const response = await axios.post(baseUrl + 'sends', {
			climbId: send.climbId,
			name: send.name,
			grade: send.grade,
			location: send.location,
			rating: send.rating,
			date: send.date,
			comment: send.comment,
		})
		return response.data
	} catch (err) {
		console.error(err)
	}
})
const sendsSlice = createSlice({
	name: 'sends',
	initialState: { isLoading: true, errMess: null, sendsArray: [] },
	reducers: {
		logSend: (state, action) => {
			state.sendsArray.push(action.payload)
		},
		removeSend: (state, action) => {
			const sendToRemove = {
				...action.payload,
			}
			return state.sendsArray.filter((climb) => climb._id !== sendToRemove._id)
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSends.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchSends.fulfilled, (state, action) => {
				state.isLoading = false
				state.errMess = null
				state.sendsArray = action.payload
			})
			.addCase(fetchSends.rejected, (state, action) => {
				state.isLoading = false
				state.errMess = action.error ? action.error.message : 'Fetch failed'
			})
			.addCase(postSend.pending, (state) => {
				state.isLoading = true
			})
			.addCase(postSend.fulfilled, (state, action) => {
				state.isLoading = false
				state.errMess = null
				state.sendsArray.push(action.payload)
			})
			.addCase(postSend.rejected, (state, action) => {
				state.isLoading = false
				state.errMess = action.error ? action.error.message : 'Post failed'
			})
	},
})

export const { logSend, removeSend } = sendsSlice.actions
export const sendsReducer = sendsSlice.reducer
