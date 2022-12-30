import { Avatar, ListItem, Icon } from 'react-native-elements'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../shared/baseUrl'

const RenderClimbsByLocation = ({ locations }) => {
	const { colors } = useTheme()

	const climbs = useSelector((state) => state.climbs.climbsArray)

	const navigation = useNavigation()

	const filteredClimbs = climbs.filter((el) => el.location === locations.name)

	if (climbs.isLoading) {
		return <Loading />
	}

	if (climbs.errMess) {
		return (
			<View>
				<Text>{climbs.errMess}</Text>
			</View>
		)
	}

	const renderClimbItem = ({ item: climb }) => {
		return (
			<ListItem
				containerStyle={{
					backgroundColor: colors.card,
					color: colors.text,
					marginVertical: 5,
				}}
				key={climb._id}
				onPress={() => {
					navigation.navigate('ClimbInfo', { climb })
				}}
			>
				<Avatar
					icon={{ name: 'landscape', type: 'material' }}
					size={'medium'}
					containerStyle={{
						backgroundColor: colors.card,
						color: colors.text,
					}}
				/>
				<ListItem.Content>
					<ListItem.Title style={{ color: colors.text }}>
						{climb.name}, {climb.grade}
					</ListItem.Title>
					<ListItem.Subtitle style={{ color: colors.text }}>
						{climb.location}
					</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
		)
	}
	return (
		<View style={{ paddingHorizontal: 15 }}>
			<FlatList
				data={filteredClimbs}
				renderItem={renderClimbItem}
				keyExtractor={(item) => item._id.toString()}
				style={{ marginTop: 10 }}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#000',
		color: '#fff',
	},
})

export default RenderClimbsByLocation
