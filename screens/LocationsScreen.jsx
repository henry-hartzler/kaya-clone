import {
    StyleSheet, 
    SafeAreaView,
    View, 
    Text,
    ScrollView
} from 'react-native';
import { 
    Avatar,
    ListItem, 
    Button,
    Icon
} from 'react-native-elements';
import { useSelector } from 'react-redux';

const LocationsScreen = ({ navigation }) => {
    const locations = useSelector(state => state.locations)

    
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerSubtitle}>
                    Hi, Henry
                </Text>
                <Text style={styles.headerTitle}>
                    WHERE ARE YOU CLIMBING TODAY?
                </Text>
            </View>
            <View style={{ padding: 10 }}>
                <Button
                    title='Climbs, locations, and people'
                    icon={<Icon 
                        name="search"
                            type="font-awesome"
                            size={18}
                            iconStyle={{ width: 24 }}
                            color='#fff'
                        />}
                    onPress={() => navigation.navigate('Search')}
                />
            </View>
            <ScrollView>
                <Text style={{ fontSize: 20, color: "#fff" }}>
                   Locations
                </Text>

                {locations.locationsArray.map(location => (
                    <ListItem 
                        style={styles.listItem} 
                        key={location.id}
                        onPress={() => {
                            navigation.navigate('Search')
                        }}
                    >
                        <Avatar rounded source={location.image} />
                        <ListItem.Content style={styles.listItemContent}>
                            <ListItem.Title>{location.name}</ListItem.Title>
                            <ListItem.Subtitle>{location.state}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </SafeAreaView>
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
    },
    listItem: {
        marginVertical: 5,
        backgroundColor: '#000',
        color: '#fff'
    },
    listItemContent: {
        
    }

})
 
export default LocationsScreen;