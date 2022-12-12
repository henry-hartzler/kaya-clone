import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native'
import RenderIndividualClimbs from '../features/climbs/RenderIndividualClimbs'
import ScreenHeader from '../features/header/ScreenHeader'
import { toggleToDo } from '../features/ToDo/toDoSlice'
import { toggleSends } from '../features/sends/sendsSlice'

const ClimbInfoScreen = ({ route }) => {
	const { climb } = route.params
	const toDos = useSelector((state) => state.toDos)
	const sends = useSelector((state) => state.sends)
	const toDoClimbs = toDos.includes(climb.id)
	const toggleSend = () => {
		if (toDoClimbs) {
			dispatch(toggleToDo(climb.id))
			dispatch(toggleSends(climb.id))
		} else {
			dispatch(toggleSends(climb.id))
		}
	}
	const dispatch = useDispatch()

	return (
		<SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
			<ScreenHeader />
			<RenderIndividualClimbs
				climb={climb}
				isToDo={toDos.includes(climb.id)}
				isSend={sends.includes(climb.id)}
				markToDo={() => dispatch(toggleToDo(climb.id))}
				markSend={() => toggleSend()}
			/>
		</SafeAreaView>
	)
}

export default ClimbInfoScreen
