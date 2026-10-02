import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthContext } from "./AuthContext"; 
import { useContext } from "react";

//some imports we need, some er scripts we need data from and some are react things

type HomeScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
//this is what makes navigation possible

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigation>(); //aways you to use navigation function in short make scene transiotion possible
  const auth = useContext(AuthContext); //gives scene acces to the logged in bool

    if (!auth) {
    throw new Error("Something wrong");
  } //throw a error if it doesnt have accese to logged in bool
    

  return (
    <View style={styles.container}> {/*view is where alle the thing that are shown should be*/}
      <Text style={styles.title}>The Best Car Rental</Text>{/*title*/}

      <Button
        title="View Car Selection"
        onPress={() => {navigation.navigate("Cars"); auth.setIsLoggedIn(false);}}
      />
      {/*button that sets the logged in bool to false becuase they are not logged in and switches scene to Cars*/}

      <View style={styles.line} />

      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.Input} placeholder="UserName" /> {/*input fields for username*/}
      <TextInput style={styles.Input} placeholder="Password" />{/*input field for password*/} 

      <Button title="Login" onPress={() => {navigation.navigate("Cars"); auth.setIsLoggedIn(true);}} />
      <Button title="Sign-up" onPress={() => {navigation.navigate("Cars"); auth.setIsLoggedIn(true);}} />
        {/*button that sets the logged in bool to true becuase they are logged in and switches scene to Cars*/}

      <StatusBar style="auto" />
    </View>
  );
}

//Plan to combine this into one file and make the visuals better
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
