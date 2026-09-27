import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthContext } from "./AuthContext"; 
import { useContext } from "react";

type HomeScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigation>();
  const auth = useContext(AuthContext);

    if (!auth) {
    throw new Error("Home must be used inside AuthProvider");
  }
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Best Car Rental</Text>

      <Button
        title="View Car Selection"
        onPress={() => {navigation.navigate("Cars"); auth.setIsLoggedIn(false);}}
      />

      <View style={styles.line} />

      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.Input} placeholder="UserName" />
      <TextInput style={styles.Input} placeholder="Password" />

      <Button title="Login" onPress={() => {navigation.navigate("Cars"); auth.setIsLoggedIn(true);}} />
      <Button title="Sign-up" onPress={() => {navigation.navigate("Cars"); auth.setIsLoggedIn(true);}} />

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
    marginTop: 10,
  },
  Input: {
    borderWidth: 1,
    padding: 10,
  },
});
