import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import Loading from './Loading';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = 'c84b32007539ea00ce91bd763ed72c65';


export default class extends React.Component {


  state = {
    isLoading: true
  }

  getWeather = async (latitude, longitude) => {
    const {data: {main: {temp}, weather}} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
  
    this.setState({
      isLoading: false, 
      temp: temp, 
      condition: weather[0].main
    });
    console.log(data)
  }

  getLocation = async () => {
    try{
    
      await Location.requestForegroundPermissionsAsync();
      
      const {coords: {latitude, longitude}} =  await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({isLoading: false})
   
    } catch(error) {
      Alert.alert('Impossible to set location', "So sad! :(")
    }
   
  }

  componentDidMount() {
   this.getLocation();
  }

  render () {
    const {isLoading, temp, condition} = this.state;
    return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />
     );
  }
  
}


