import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

type CarsNavigation = NativeStackNavigationProp<RootStackParamList, "Cars">;

export default function CarOdered() {

  const route = useRoute();//make so that you can use the parameter
  const { car } = route.params as { car: any };  //takes the parameter and makes into a car


  const navigation = useNavigation<CarsNavigation>(); //aways you to use navigation function in short make scene transiotion possible



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>
      <Text>Your confirmation will be sent by mail</Text>

      <Image source={{ uri: car.photo }} style={styles.carImage} />

      <Text>Car: {car.name}</Text>
      <Text>Price per day: {car.pricePerDay}kr</Text>

      <Button title="Back" onPress={() => navigation.navigate("Cars")} />
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
    width: 200,
    height: 120,
    resizeMode: 'cover',
    marginTop: 10,
  },
});
