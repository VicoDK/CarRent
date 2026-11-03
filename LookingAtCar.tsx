import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
//some imports we need, some er scripts we need data from and some are react things
import styles from './styles/styles';
import CarDetails from './Components/CarDetails';

type CarsNavigation = NativeStackNavigationProp<RootStackParamList, "Cars">;
//this is what makes navigation possible

export default function LookingAtCar() {
  const route = useRoute(); //make so that you can use the parameter
  const { car } = route.params as { car: any }; //takes the parameter and makes into a car


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
        onPress={() => navigation.navigate("CarOdered", { car })}
      />
     

      <StatusBar style="auto" />
    </View>
  );
}
