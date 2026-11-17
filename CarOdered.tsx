import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
import styles from './styles/styles';
import type { CarResponse } from "./Components/CarCard";

type CarsNavigation = NativeStackNavigationProp<RootStackParamList, "Cars">;

export default function CarOdered() {

  const route = useRoute();//make so that you can use the parameter
  
  const { car } = route.params as { car: CarResponse };  //takes the parameter and makes into a car


  const navigation = useNavigation<CarsNavigation>(); //aways you to use navigation function in short make scene transiotion possible



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>
      <Text>Your confirmation will be sent by mail</Text>

      <Image source={{ uri: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/1925_Ford_Model_T_touring.jpg/1280px-1925_Ford_Model_T_touring.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail' }} style={styles.carImage} />

      <Text>Car: {car.name}</Text>
      <Text>Price per day: {car.pricePerDay}kr</Text>

      <Button title="Back" onPress={() => navigation.navigate("Cars")} />
      <StatusBar style="auto" />
    </View>
  );
}

