import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  PermissionsAndroid,
  Button
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';

function DeviceInfo_geoloc() {
  const [uniqueId, setUniqueId] = useState(null);
  useEffect(() => {
    const fetchUniqueId = async () => {
      try {
        const androidId = await DeviceInfo.getAndroidId();
        setUniqueId(androidId);
      } catch (error) {
        console.error('Error fetching Android ID:', error);
      }
    };

    fetchUniqueId();
  }, []);
  // Get the device's model (e.g., iPhone X, Samsung Galaxy S10)
  const deviceModel = DeviceInfo.getModel();

  // Get the device's brand (e.g., Apple, Samsung)
  const deviceBrand = DeviceInfo.getBrand();

  // Get the device's system name (e.g., iOS, Android)
  const systemName = DeviceInfo.getSystemName();

  // Get the device's system version (e.g., 14.5, 11)
  const systemVersion = DeviceInfo.getSystemVersion();

  const [location, setLocation] = useState(false);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  return ( 
    <SafeAreaView>
      <View style={{justifyContent:'center',alignSelf:'center'}}>
        <Text style={{fontSize:30,fontWeight:'bold',color:'#000000'}}>Your Mobile information</Text>
        <Text style={{fontSize:25,color:'#000000'}}>Android ID: {uniqueId || 'Loading...'}</Text>
        <Text style={{fontSize:25,color:'#000000'}}>Device Model: {deviceModel}</Text>
        <Text style={{fontSize:25,color:'#000000'}}>Device Brand: {deviceBrand}</Text>
        <Text style={{fontSize:25,color:'#000000'}}>Device Name: {systemName}</Text>
        <Text style={{fontSize:25,color:'#000000'}}>System Version: {systemVersion}</Text>
      </View>
      <View style={{justifyContent:'center',alignSelf:'center',margin:'5%'}}>
        <Button title="Get Location" onPress={getLocation} />
        <Text style={{fontSize:25,color:'#000000'}}>Latitude: {location ? location.coords.latitude : null}</Text>
        <Text style={{fontSize:25,color:'#000000'}}>Longitude: {location ? location.coords.longitude : null}</Text>
      </View>
    </SafeAreaView>
  );
}

export default DeviceInfo_geoloc;
