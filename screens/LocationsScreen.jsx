import {
    StyleSheet, 
    View, 
    Text,
    ScrollView
} from 'react-native';
import { 
    SearchBar,
    Avatar,
    Card,
    ListItem
} from 'react-native-elements';
import { useSelector } from 'react-redux';

const LocationsScreen = () => {
    const locations = useSelector(state => state.locations)

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerSubtitle}>
                    Hi, Henry
                </Text>
                <Text style={styles.headerTitle}>
                    WHERE ARE YOU CLIMBING TODAY?
                </Text>
            </View>
            <View style={{ padding: 10 }}>
                <SearchBar 
                    round
                    placeholder='Climbs, locations, and people'
                />
            </View>
            <ScrollView>
                <Text style={{ color: "#fff" }}>
                    Locations
                </Text>
                {locations.locationsArray.map( location => (
                    <ListItem key={location.id}>
                        <Avatar rounded source={location.image} />
                        <ListItem.Content>
                            <ListItem.Title>{location.name}</ListItem.Title>
                            <ListItem.Subtitle>{location.state}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#000',
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start'
    },
    header: {
        marginTop: 10,
        marginLeft: 10
    },
    headerSubtitle: {
        color:'#fff',
        paddingBottom: 5,
        fontSize: 22
    },
    headerTitle: {
        color: '#FFFF00',
        paddingRight: 50,
        fontSize: 32,
        fontWeight: 'bold'    
    }
})
 
export default LocationsScreen;