import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
//some imports we need, some er scripts we need data from and some are react things

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
      <Text style={styles.title}>{car.name}</Text>

      <Image
        source={{ uri: car.photo }}
        style={styles.carImage}
      />
<Image source={{ uri: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/1925_Ford_Model_T_touring.jpg/1280px-1925_Ford_Model_T_touring.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail" }} style={styles.carImage} />
      <Text>Model: {car.model}</Text>
      <Text>Year: {car.year}</Text>
      <Text>Price per day: {car.pricePerDay}kr</Text>
      <Text>Available: {car.isAvailable ? "Yes" : "No"}</Text>

      <Button
        title="Rent"
        onPress={() => navigation.navigate("CarOdered", { car })}
      />

      <StatusBar style="auto" />
    </View>
  );
}

//Eas cooking area (måske burde du lavet et samlet document til det)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  carImage: {
    width: 400,
    height: 240,
    resizeMode: 'cover',
    marginTop: 10,
  },
});
