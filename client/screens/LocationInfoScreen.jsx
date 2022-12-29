import { SafeAreaView } from 'react-native'
import RenderLocation from '../features/locations/RenderLocation'
import RenderClimbsByLocation from '../features/climbs/RenderClimbsByLocation'
import ScreenHeader from '../features/header/ScreenHeader'

const LocationInfoScreen = ({ route }) => {
	const { location } = route.params

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScreenHeader />
			<RenderLocation location={location} />
			<RenderClimbsByLocation locations={location} />
		</SafeAreaView>
	)
}

export default LocationInfoScreen
