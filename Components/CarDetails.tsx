import { Button, StyleSheet, Text, View, Image } from 'react-native';
import styles from '../styles/styles';
import type { CarResponse } from './CarCard';

type CarDetailsProps = {
  car: CarResponse;
};

export default function CarDetails({ car }: CarDetailsProps) {
  return (
    <View>
      <Text style={styles.title}>{car.name}</Text>

    <Image source={{ uri: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/1925_Ford_Model_T_touring.jpg/1280px-1925_Ford_Model_T_touring.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail"}} style={styles.carImage} />

    <Text>Model: {car.model}</Text>
    <Text>Year: {car.year}</Text>
    <Text>Price per day: {car.pricePerDay}kr</Text>
    <Text>Available: {car.isAvailable ? "Yes" : "No"}</Text>
    </View>
  );
}