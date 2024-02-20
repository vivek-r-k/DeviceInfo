import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const Coordinate = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [inOffice, setInOffice] = useState(false);
  const officeCoordinates = { latitude: 15.3710133, longitude: 75.1227083 }; // replace with your office coordinates

  const checkLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ latitude, longitude });

        const distance = getDistanceFromLatLonInKm(latitude, longitude, officeCoordinates.latitude, officeCoordinates.longitude);
        if (distance < 0.01) { // assuming office radius is 10m
          setInOffice(true);
        } else {
          setInOffice(false);
        }
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }

    checkLocation();
  }, []);

  return (
    <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'#000000'}}>Status: {inOffice ? "You are in the office" : "You are not in the office"}</Text>
      <Text style={{marginBottom:'5%',fontSize:15,color:'#000000'}}>Current Location: {currentPosition ? `Latitude: ${currentPosition.latitude}, Longitude: ${currentPosition.longitude}` : "Fetching..."}</Text>
      <Button title="Refresh Status" onPress={checkLocation} />
    </View>
  );
};

// function to calculate distance between two coordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export default Coordinate;
