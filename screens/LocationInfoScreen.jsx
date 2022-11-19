import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";

const LocationInfoScreen = ({ route }) => {
    const { location } = route.params

    const dispatch = useDispatch()
    return (
        <View>
            <Text>Hello World</Text>
        </View>
    )
   
}
 
export default LocationInfoScreen;