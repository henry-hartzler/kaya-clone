import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FlatList, StyleSheet, Text, View, Button } from "react-native"
import RenderIndividualClimbs from "../features/climbs/RenderIndividualClimbs"

const ClimbInfoScreen = ({ route }) => {
	const { climb } = route.params
	const dispatch = useDispatch()

	return (
		<View>
			<RenderIndividualClimbs climb={climb} />
		</View>
	)
}

export default ClimbInfoScreen
