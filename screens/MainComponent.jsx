import { StyleSheet, View, Text, Platform } from "react-native"
import Constants from "expo-constants"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "react-native-elements"
import ForYouScreen from "./ForYouScreen"
import AchievementsScreen from "./AchievementsScreen"
import LocationsScreen from "./LocationsScreen"
import ProfileScreen from "./ProfileScreen"
import SearchScreen from "./SearchScreen"
import LocationInfoScreen from "./LocationInfoScreen"

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#000",
					color: "#fff",
				},
				tabBarActiveTintColor: "#fff",
				tabBarShowLabel: false,
				headerShown: false,
			}}
			initialRouteName='For You'
		>
			<Tab.Screen
				name='For You'
				component={ForYouScreen}
				options={{
					title: "For You",
					tabBarIcon: ({ color }) => (
						<Icon
							name='play'
							type='font-awesome'
							size={24}
							iconStyle={{ width: 24 }}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Achievements'
				component={AchievementsScreen}
				options={{
					title: "Achievements",
					tabBarIcon: ({ color }) => (
						<Icon
							name='trophy'
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
					title: "Locations",
					tabBarIcon: ({ color }) => (
						<Icon
							name='map'
							type='font-awesome'
							size={24}
							iconStyle={{ width: 24 }}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<Icon
							name='user'
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
	return (
		<View
			style={{
				flex: 1,
				paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
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
			</Stack.Navigator>
		</View>
	)
}

const styles = StyleSheet.create({
	mainFooter: {
		backgroundColor: "black",
		color: "#fff",
		padding: 100,
	},
})

export default Main
