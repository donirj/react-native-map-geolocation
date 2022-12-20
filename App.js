import React from 'react';
import * as Location from 'expo-location'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline} from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_KEY } from '@env';


export default function App() {
  const [origin, setOrigin] = React.useState({
    latitude: 19.399718,
    longitude: -99.265706
  })

  const [destination, setDestination] = React.useState({
    latitude: 19.659645,
    longitude: -101.160263
    // 19.659645, -101.160263
  })

  React.useEffect(() => {
    getLocationPermission();
  }, [])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied')
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current)
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text>
            21 min
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text>
            1hr, 38 min
          </Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
      <MapView 
        style={styles.map}
          initialRegion={{
            latitude: origin.latitude,   
            longitude: origin.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.01
            // 19.394546, -99.282147
          }}
        >
        <Marker 
          coordinate={origin}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="red"
          strokeWidth={2}
        />
        {/* <Polyline
          coordinates={[origin,destination]}
          strokeColor="black"
          strokeWidth={5}
        /> */}
      </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
    // borderColor: '#6698F4'
  },
  map: {
    width: 309,
    height: 179,
    borderRadius: 50
  },
  innerContainer:{
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginBottom: 10
  },
  textContainer: {
    marginLeft: 10
  }
});
