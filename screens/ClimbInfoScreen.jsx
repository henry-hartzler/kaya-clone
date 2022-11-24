import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FlatList, StyleSheet, Text, View, Button } from "react-native"
import RenderIndividualClimbs from "../features/climbs/RenderIndividualClimbs"
import ScreenHeader from "../features/header/ScreenHeader"
import { addToDo } from "../features/ToDo/toDoSlice"

const ClimbInfoScreen = ({ route }) => {
	const { climb } = route.params
	const toDos = useSelector((state) => state.toDos)
	const dispatch = useDispatch()

	return (
		<View style={{ backgroundColor: "#000", flex: 1 }}>
			<ScreenHeader />
			<RenderIndividualClimbs
				climb={climb}
				isToDo={toDos.includes(climb.id)}
				markToDo={() => dispatch(addToDo(climb.id))}
			/>
		</View>
	)
}

export default ClimbInfoScreen
