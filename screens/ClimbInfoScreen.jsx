import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native'
import RenderIndividualClimbs from '../features/climbs/RenderIndividualClimbs'
import ScreenHeader from '../features/header/ScreenHeader'
import { toggleToDo } from '../features/ToDo/toDoSlice'
import { logSend } from '../features/sends/sendsSlice'

const ClimbInfoScreen = ({ route }) => {
	const { climb } = route.params
	const toDos = useSelector((state) => state.toDos)
	const sends = useSelector((state) => state.sends)
	const toDoClimbs = toDos.includes(climb.id)
	const sendsClimbs = sends.some((e) => e.name === climb.name)

	const dispatch = useDispatch()

	const toggleToDos = () => {
		dispatch(toggleToDo(climb.id))
	}

	const handleSend = () => {
		const send = {
			name: climb.name,
			grade: climb.grade,
			image: climb.image,
			location: climb.location,
			rating: climb.rating,
		}
		dispatch(logSend(send))
		if (toDoClimbs) {
			dispatch(toggleToDo(climb.id))
		}
	}

	return (
		<SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
			<ScreenHeader />
			<RenderIndividualClimbs
				climb={climb}
				isToDo={toDos.includes(climb.id)}
				isSend={sendsClimbs}
				markToDo={() => toggleToDos()}
				markSend={() => handleSend()}
			/>
		</SafeAreaView>
	)
}

export default ClimbInfoScreen
