import { configureStore } from "@reduxjs/toolkit"
import { climbsReducer } from "../features/climbs/climbsSlice"
import { locationsReducer } from "../features/locations/locationsSlice"
import { toDoReducer } from "../features/ToDo/toDoSlice"
import { sendsReducer } from "../features/sends/sendsSlice"

export const store = configureStore({
	reducer: {
		climbs: climbsReducer,
		locations: locationsReducer,
		toDos: toDoReducer,
		sends: sendsReducer,
	},
})
