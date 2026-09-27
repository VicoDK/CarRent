import { StatusBar } from 'expo-status-bar';
import {  Button, StyleSheet,  Text,  View,  FlatList,  Image, Pressable,} from 'react-native';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
import { useState } from "react";


type CarsNavigation = NativeStackNavigationProp<RootStackParamList, "Cars">;


interface ItemType {
  id: string;
  title: string;
  photo: string;
  price: number;
}

const data: ItemType[] = [
  { id: '1', title: 'Car1', photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg" ,price: 100},
  { id: '2', title: 'Car2' , photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg",price: 100 },
  { id: '3', title: 'Car3', photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg" ,price: 100 },
  { id: '4', title: 'Car4', photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg",price: 100  },
  { id: '5', title: 'Car5', photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg",price: 100  },
  { id: '6', title: 'Car6', photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg" ,price: 100 },
  { id: '7', title: 'Car7', photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg" ,price: 100 },
  { id: '8', title: 'Car8' , photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg",price: 100 },
  { id: '9', title: 'Car9' , photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg",price: 100 },
  { id: '10', title: 'Car10' , photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg",price: 100 },
  { id: '11', title: 'Car11' , photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg",price: 100 },
  { id: '12', title: 'Car12' , photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg" ,price: 100},
  { id: '13', title: 'Car13' , photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg",price: 100 },
  { id: '14', title: 'Car14' , photo: "https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg" ,price: 100},

];


export default function Cars() {
  const navigation = useNavigation<CarsNavigation>();
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Home must be used inside AuthProvider");
  }

  const [text, setText] = useState("Car Selection");


    return (
  <View style={styles.container}>
    <Text style={styles.title} >{text}</Text>
    <FlatList<ItemType>
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable style={styles.loggedInItem} onPress={() => {auth.isLoggedIn ? navigation.navigate("LookingAtCar") : setText("You need to login before selection a car")}} >

          <Text>
            {item.title}: {item.price}kr
          </Text>

          <Image
            source={{ uri: item.photo }}
            style={styles.carImage}
          />
        </Pressable>
      )}
    />

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