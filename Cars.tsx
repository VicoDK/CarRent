import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Modal, Platform } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/styles';
import CarCard, { CarResponse } from './Components/CarCard';
import CarList from './Components/CarList';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateSelectionModal from './Components/DatePick';
import type { Booking } from './Booking';

type CarsNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Cars'
>;

export default function Cars() {
  const [showDateModal, setShowDateModal] = useState(false);
  const navigation = useNavigation<CarsNavigation>();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('Something wrong');
  }

  const [cars, setCars] = useState<CarResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('Car Selection');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [datePickerFor, setDatePickerFor] = useState<'start' | 'end' | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

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

  useEffect(() => {
    async function loadBookings() {
      try {
        const storedBookings = await AsyncStorage.getItem('bookings');
        setBookings(storedBookings ? JSON.parse(storedBookings) : []);
      } catch (error) {
        console.error('Error loading bookings:', error);
      }
    }

    loadBookings();
  }, []);

  const formatDateInput = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {loading ? 'Loading cars...' : text}
      </Text>

      <Button title="Date Select" onPress={() => setShowDateModal(true)} />

      <DateSelectionModal
        visible={showDateModal}
        startDate={startDate}
        endDate={endDate}
        onClose={() => setShowDateModal(false)}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <CarList
  cars={cars}
  loading={loading}
  bookings={bookings}
  startDate={startDate}
  endDate={endDate}
  onCarPress={(car) => {
    console.log(startDate);
    if (auth.isLoggedIn && startDate != null &&  endDate != null) {
      navigation.navigate('LookingAtCar', { car, StartDate: startDate, EndDate: endDate });
    } else if (startDate == null &&  endDate == null && auth.isLoggedIn)
    {
        setText('You need to select a date');
    }
    else
    {
      setText('You need to login before selecting a car');
    }
  }}
/>



      <StatusBar style="auto" />
    </View>
  );
}