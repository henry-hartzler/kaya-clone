import { createSlice } from "@reduxjs/toolkit"
import { LOCATIONS } from "../../shared/locations"

const locationsSlice = createSlice({
	name: "locations",
	initialState: {
		locationsArray: LOCATIONS,
	},
	reducers: {
		addLocation: (state, action) => {
			const newLocation = {
				id: state.locationsArray.length,
				...action.payload,
			}
			state.locationsArray.push(newLocation)
		},
	},
})

export const { addLocation } = locationsSlice.actions
export const locationsReducer = locationsSlice.reducer

export const selectAlllocations = (state) => state.locations.locationsArray
export const selectlocationsById = (id) => (state) =>
	state.locations.locationsArray.find((c) => c.id === parseInt(id))
