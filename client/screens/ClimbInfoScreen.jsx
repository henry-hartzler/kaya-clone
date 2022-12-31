import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native'
import RenderIndividualClimbs from '../features/climbs/RenderIndividualClimbs'
import ScreenHeader from '../features/header/ScreenHeader'

const ClimbInfoScreen = ({ route }) => {
	const { climb } = route.params
	const toDos = useSelector((state) => state.toDos.toDosArray)
	const sends = useSelector((state) => state.sends)
	const sendsClimbs = sends.some((e) => e.name === climb.name)
	const toDoClimbs = toDos.some((e) => e.climbId === climb._id)

	console.log(toDoClimbs)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScreenHeader />
			<RenderIndividualClimbs
				climb={climb}
				isToDo={toDoClimbs}
				isSend={sendsClimbs}
			/>
		</SafeAreaView>
	)
}

export default ClimbInfoScreen
