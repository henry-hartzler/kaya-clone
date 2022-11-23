import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FlatList, StyleSheet, Text, View, Button } from "react-native"
import RenderLocation from "../features/locations/RenderLocation"

const LocationInfoScreen = ({ route }) => {
	const { location } = route.params

	const dispatch = useDispatch()
	return (
		<View>
			<RenderLocation location={location} />
		</View>
	)
}

export default LocationInfoScreen
