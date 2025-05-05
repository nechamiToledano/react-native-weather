import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required.');
        return;
      }

      try {
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        setLocation(loc.coords);
      } catch (err) {
        Alert.alert('Error', 'Failed to get location.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Icon name="location" size={60} color="#2196f3" style={styles.icon} />
      <Text style={styles.title}>Welcome to Weatherly</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="View Weather"
          onPress={() => navigation.navigate('Weather', { coords: location })}
          color="#2196f3"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  icon: { marginBottom: 20 },
});
