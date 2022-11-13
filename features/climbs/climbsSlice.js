import { createSlice } from "@reduxjs/toolkit";
import { CLIMBS } from "../../shared/climbs";

const climbsSlice = createSlice({
    name: 'climbs',
    initialState: {
        climbsArray: CLIMBS
    },
    reducers: {
        addClimb: (state, action) => {
            const newClimb = {
                id: state.climbsArray.length,
                ...action.payload
            }
            state.climbsArray.push(newClimb)
        }
    }
})

export const { addClimb } = climbsSlice.actions
export const climbsReducer = climbsSlice.reducer

export const selectAllClimbs = state => state.climbs.climbsArray
export const selectClimbsById = id => state => state.climbs.climbsArray.find(c => c.id === parseInt(id))