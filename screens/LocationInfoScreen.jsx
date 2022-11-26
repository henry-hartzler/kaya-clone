import { View } from "react-native"
import RenderLocation from "../features/locations/RenderLocation"
import RenderClimbsByLocation from "../features/climbs/RenderClimbsByLocation"
import ScreenHeader from "../features/header/ScreenHeader"

const LocationInfoScreen = ({ route }) => {
	const { location } = route.params

	return (
		<View style={{ backgroundColor: "#000", flex: 1 }}>
			<ScreenHeader />
			<RenderLocation location={location} />
			<RenderClimbsByLocation locations={location} />
		</View>
	)
}

export default LocationInfoScreen
