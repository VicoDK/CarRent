import { StatusBar } from 'expo-status-bar';
import {  Button, StyleSheet,  Text,  View,  FlatList,  Image, Pressable,} from 'react-native';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
//some imports we need, some er scripts we need data from and some are react things


type CarsNavigation = NativeStackNavigationProp<RootStackParamList, "Cars">;
//this is what makes navigation possible

interface CarResponse {
  id: string;
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  isAvailable: boolean;
}
//variable to store data


export default function Cars() {
  const navigation = useNavigation<CarsNavigation>(); //aways you to use navigation function in short make scene transiotion possible
  const auth = useContext(AuthContext); //gives scene acces to the logged in bool
  if (!auth) {
  throw new Error("Something wrong");
  } //throw a error if it doesnt have accese to logged in bool


  const [cars, setCars] = useState<CarResponse[]>([]); //list for cars 
  const [loading, setLoading] = useState(true); //loading
  const [text, setText] = useState("Car Selection"); //text to change if user is not logged in


  //api call
  useEffect(() => {
    async function loadCars() {
      try {
        const stored = await AsyncStorage.getItem("cars");
        if (stored) {
          setCars(JSON.parse(stored));
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://raw.githubusercontent.com/OthelloEngineer/mobile-software-development-exercises/refs/heads/main/cars.json"
        );
        const apiCars = await res.json();

        setCars(apiCars);
        await AsyncStorage.setItem("cars", JSON.stringify(apiCars));
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []); //runing on juleskum
  

    return (
  <View style={styles.container}>
    <Text style={styles.title} >{text}</Text>
    <FlatList
      data={cars}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          style={styles.loggedInItem}
          onPress={() => {
            if (auth.isLoggedIn) {
              navigation.navigate("LookingAtCar", { car: item });

            } else {
              setText("You need to login before selecting a car");
            } //changes text if not logged in and if changes scene with a parameter
          }}
        >
          <Text>{item.name} - {item.pricePerDay}kr/day</Text>
          <Image source={{ uri: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/1925_Ford_Model_T_touring.jpg/1280px-1925_Ford_Model_T_touring.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail" }} style={styles.carImage} /> 
        </Pressable>
      )}
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
  
  line: {
  height: 1,
  backgroundColor: 'black',
  width: '100%',
  marginTop: 10,},

Input:{
borderWidth: 1,
padding: 10
},
item: { 
    padding: 20, 
    width:250,
    borderBottomWidth: 1, 
    borderColor: 'rgb(10, 10, 10)', 
    backgroundColor: 'rgb(112, 112, 112)'},
carImage: {
  width: 400,
  height: 240,
  resizeMode: 'cover',
  marginTop: 10,
},
  itemPressed: {
    
    opacity: 0.6,
  },
  loggedInItem: {
    backgroundColor: 'gray',
  },
  loggedOutItem: {
    backgroundColor: 'gray',
  },
});