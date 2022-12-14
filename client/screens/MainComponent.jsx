import { StyleSheet, View, Text, Platform } from 'react-native'
import Constants from 'expo-constants'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import ToDoScreen from './ToDoScreen'
import LocationsScreen from './LocationsScreen'
import SendsScreen from './SendsScreen'
import SearchScreen from './SearchScreen'
import LocationInfoScreen from './LocationInfoScreen'
import ClimbInfoScreen from './ClimbInfoScreen'
import { fetchClimbs } from '../features/climbs/climbsSlice'
import { fetchLocations } from '../features/locations/locationsSlice'
import { fetchToDos } from '../features/ToDo/toDoSlice'
import { fetchSends } from '../features/sends/sendsSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#000',
					color: '#fff',
				},
				tabBarActiveTintColor: '#fff',
				tabBarShowLabel: false,
				headerShown: false,
			}}
			initialRouteName='Locations'
		>
			<Tab.Screen
				name='To Do'
				component={ToDoScreen}
				options={{
					title: 'To Do',
					tabBarIcon: ({ color }) => (
						<Icon
							name='list'
							type='font-awesome'
							size={24}
							iconStyle={{ width: 24 }}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Locations'
				component={LocationsScreen}
				options={{
					title: 'Locations',
					tabBarIcon: ({ color }) => (
						<Icon
							name='map-marker'
							type='font-awesome'
							size={26}
							iconStyle={{ width: 26 }}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Sends'
				component={SendsScreen}
				options={{
					title: 'Sends',
					tabBarIcon: ({ color }) => (
						<Icon
							name='check'
							type='font-awesome'
							size={24}
							iconStyle={{ width: 24 }}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}

const Stack = createNativeStackNavigator()

const Main = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchClimbs())
		dispatch(fetchLocations())
		dispatch(fetchToDos())
		dispatch(fetchSends())
	}, [dispatch])

	return (
		<View
			style={{
				flex: 1,
				paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
			}}
		>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name='Home'
					component={HomeTabs}
				/>
				<Stack.Screen
					name='Search'
					component={SearchScreen}
				/>
				<Stack.Screen
					name='LocationInfo'
					component={LocationInfoScreen}
					options={({ route }) => ({
						title: route.params.location.name,
					})}
				/>
				<Stack.Screen
					name='ClimbInfo'
					component={ClimbInfoScreen}
					options={({ route }) => ({
						title: route.params.climb.name,
					})}
				/>
			</Stack.Navigator>
		</View>
	)
}

const styles = StyleSheet.create({
	mainFooter: {
		backgroundColor: 'black',
		color: '#fff',
		padding: 100,
	},
})

export default Main
