
import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/styles';
import CarCard, { CarResponse } from './Components/CarCard';
import CarList from './Components/CarList';

type CarsNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Cars'
>;

export default function Cars() {
  const navigation = useNavigation<CarsNavigation>();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('Something wrong');
  }

  const [cars, setCars] = useState<CarResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('Car Selection');

  useEffect(() => {
    async function loadCars() {
      try {
        const stored = await AsyncStorage.getItem('cars');

        if (stored) {
          setCars(JSON.parse(stored));
          return;
        }

        const res = await fetch(
          'https://raw.githubusercontent.com/OthelloEngineer/mobile-software-development-exercises/refs/heads/main/cars.json'
        );

        if (!res.ok) {
          throw new Error('Failed to fetch cars');
        }

        const apiCars: CarResponse[] = await res.json();

        setCars(apiCars);
        await AsyncStorage.setItem('cars', JSON.stringify(apiCars));
      } catch (error) {
        console.error('Error loading cars:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {loading ? 'Loading cars...' : text}
      </Text>

      <CarList
  cars={cars}
  loading={loading}
  onCarPress={(car) => {
    if (auth.isLoggedIn) {
      navigation.navigate('LookingAtCar', { car });
    } else {
      setText('You need to login before selecting a car');
    }
  }}
/>

{/*need a date window to open op to rent in a perid and then only show cars avaible */}

      <StatusBar style="auto" />
    </View>
  );
}