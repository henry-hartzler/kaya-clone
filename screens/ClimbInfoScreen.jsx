import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FlatList, StyleSheet, Text, View, Button } from "react-native"
import RenderIndividualClimbs from "../features/climbs/RenderIndividualClimbs"
import ScreenHeader from "../features/header/ScreenHeader"

const ClimbInfoScreen = ({ route }) => {
	const { climb } = route.params
	const dispatch = useDispatch()

	return (
		<View>
			<ScreenHeader />
			<RenderIndividualClimbs climb={climb} />
		</View>
	)
}

export default ClimbInfoScreen
