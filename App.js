import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

function App() {
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
  console.log('Device Model:', deviceModel);

  // Get the device's brand (e.g., Apple, Samsung)
  const deviceBrand = DeviceInfo.getBrand();
  console.log('Device Brand:', deviceBrand);

  // Get the device's system name (e.g., iOS, Android)
  const systemName = DeviceInfo.getSystemName();
  console.log('System Name:', systemName);

  // Get the device's system version (e.g., 14.5, 11)
  const systemVersion = DeviceInfo.getSystemVersion();
  console.log('System Version:', systemVersion);
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
    </SafeAreaView>
  );
}

export default App;
