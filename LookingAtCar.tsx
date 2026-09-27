import { StatusBar } from 'expo-status-bar';
import {  Button, StyleSheet,  Text,  View,  FlatList,  Image, Pressable,} from 'react-native';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

type CarsNavigation = NativeStackNavigationProp<RootStackParamList, "Cars">;

export default function LookingAtCar() {
  const auth = useContext(AuthContext);
  const navigation = useNavigation<CarsNavigation>();
  if (!auth) {
    throw new Error("Home must be used inside AuthProvider");
  }

    return (
  <View style={styles.container}>
    <Text style={styles.title}>Car x</Text>
    <Image
        source={{ uri: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg" }}
        style={styles.carImage}
    />
    <Text>Price : 100kr</Text>
    <Button title="Rent" onPress={() => navigation.navigate("CarOdered")} />
    <StatusBar style="auto" />
  </View>
);

}

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