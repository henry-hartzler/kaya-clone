import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FlatList, StyleSheet, Text, View, Button } from "react-native"
import RenderLocation from "../features/locations/RenderLocation"
import RenderClimbsByLocation from "../features/climbs/RenderClimbsByLocation"
import ScreenHeader from "../features/header/ScreenHeader"

const LocationInfoScreen = ({ route }) => {
	const { location } = route.params

	const dispatch = useDispatch()

	return (
		<View style={{ backgroundColor: "#000", flex: 1 }}>
			<ScreenHeader />
			<RenderLocation location={location} />
			<RenderClimbsByLocation locations={location} />
		</View>
	)
}

export default LocationInfoScreen
