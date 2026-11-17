import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useContext, type ContextType  } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigation, useRoute, type RouteProp  } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
//some imports we need, some er scripts we need data from and some are react things
import styles from './styles/styles';
import CarDetails from './Components/CarDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';





type CarsNavigation = NativeStackNavigationProp<RootStackParamList, "Cars">;
//this is what makes navigation possible

type LookingAtCarRoute = RouteProp<RootStackParamList, 'LookingAtCar'>;

export default function LookingAtCar() {
  const route = useRoute<LookingAtCarRoute>();
  const { car, StartDate, EndDate } = route.params;


    const navigation = useNavigation<CarsNavigation>(); //aways you to use navigation function in short make scene transiotion possible
    const auth = useContext(AuthContext); //gives scene acces to the logged in bool


    if (!auth) {
    throw new Error("Something wrong");
  } //throw a error if it doesnt have accese to logged in bool
    

  return (
    <View style={styles.container}>
      <CarDetails car={car} />

      <Button
        title="Rent"
        onPress={() => rentCar(auth)}
      />
     

      <StatusBar style="auto" />
    </View>
  );


  async function rentCar(auth: NonNullable<ContextType<typeof AuthContext>>) {

    const booking = {
      id: Date.now().toString(),
      userName: auth.currentUser,
      carId: car.id,
      carName: car.model,
      StartDate: StartDate,
      EndDate : EndDate

    };

    const existingBookings =
      await AsyncStorage.getItem("bookings");

    const bookings =
      existingBookings
        ? JSON.parse(existingBookings)
        : [];

    bookings.push(booking);

    await AsyncStorage.setItem(
      "bookings",
      JSON.stringify(bookings)
    );



//to test if right data
/*const test = await AsyncStorage.getItem("bookings");

console.log("Bookings in storage:");
console.log(test);
console.log(auth);
console.log(auth.currentUser);*/



    navigation.navigate("CarOdered", { car });
  }
}



