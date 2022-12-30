import {
	configureStore,
	getDefaultMiddleware,
	combineReducers,
} from '@reduxjs/toolkit'
import { climbsReducer } from '../features/climbs/climbsSlice'
import { locationsReducer } from '../features/locations/locationsSlice'
import { toDoReducer } from '../features/ToDo/toDoSlice'
import { sendsReducer } from '../features/sends/sendsSlice'
import { logger } from 'redux-logger'

export const store = configureStore({
	reducer: combineReducers({
		climbs: climbsReducer,
		locations: locationsReducer,
		toDos: toDoReducer,
		sends: sendsReducer,
	}),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
