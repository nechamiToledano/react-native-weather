import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import { getWeather, getWeatherByCity } from '../api/weatherApi';
import Animated, { SlideInUp } from 'react-native-reanimated';

export default function WeatherScreen({ route }) {
  const { coords } = route.params || {};
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');

  useEffect(() => {
    if (!coords) return;
    fetchWeatherByCoords(coords.latitude, coords.longitude);
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const data = await getWeather(lat, lon);
      setWeather(data);
    } catch (err) {
      console.log('Weather API error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      console.log('City fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search city"
        value={city}
        onChangeText={setCity}
      />
      <Pressable style={styles.button} onPress={fetchWeatherByCity}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : weather ? (
        
<Animated.View entering={SlideInUp.springify().damping(20)} style={styles.weatherBox}>

          <Text style={styles.cityName}>{weather.name}</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Image
            source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
            style={{ width: 100, height: 100 }}
          />
        </Animated.View>
      ) : (
        <Text style={{ marginTop: 20 }}>No weather data</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center',  paddingTop: 40 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  weatherBox: { alignItems: 'center', marginTop: 20 },
  cityName: { fontSize: 28, fontWeight: 'bold' },
  desc: { fontSize: 18, textTransform: 'capitalize' },
  temp: { fontSize: 36, fontWeight: 'bold', color: '#f44336' },
});
