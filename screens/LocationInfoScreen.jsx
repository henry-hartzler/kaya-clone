import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FlatList, StyleSheet, Text, View, Button } from "react-native"
import RenderLocation from "../features/locations/RenderLocation"
import RenderClimbsByLocation from "../features/climbs/RenderClimbsByLocation"

const LocationInfoScreen = ({ route }) => {
	const { location } = route.params
	const { climb } = route.params
	const dispatch = useDispatch()

	return (
		<View>
			{console.log(route)}
			{console.log(location)}
			{console.log(climb)}
			<RenderLocation location={location} />
			<RenderClimbsByLocation
				locations={location}
				climb={climb}
			/>
		</View>
	)
}

export default LocationInfoScreen
