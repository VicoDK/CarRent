import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthProvider } from "./AuthContext";
import { Button, Pressable, Text, View } from 'react-native';


import Home from "./Home";
import Cars from "./Cars";
import LookingAtCar from "./LookingAtCar";
import CarOdered from "./CarOdered";
import Profil from './Profil';

const Stack = createNativeStackNavigator<RootStackParamList>(); {/*makes a kinda list for all scenes and is used to go thogh the scenes*/}



export default function App() {
  return (
    <AuthProvider> {/*makes sure that the program have acces to the auth logged in data*/}
    <NavigationContainer> {/*makes the group for the scenes*/}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation, route }) => ({
          headerBackVisible: false,
          headerLeft:
            route.name === 'Home' || route.name === 'Cars'
              ? () => null
              : () => (
                <Pressable onPress={() => navigation.navigate('Cars')}>
                  <Text style={{ fontSize: 28 }}>‹</Text>
                </Pressable>
              ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button
                title="Profil"
                onPress={() => navigation.navigate('Profil')}
              />
              <Button
                title="Logout"
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          ),
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cars" component={Cars} />
        <Stack.Screen
          name="LookingAtCar"
          component={LookingAtCar}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go to Cars"
                onPress={() => navigation.navigate('Cars')}
              >
                <Text style={{ fontSize: 28 }}>‹</Text>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name ="CarOdered" component={CarOdered}/>
        <Stack.Screen name ="Profil" component={Profil}/>
        {/*registers all scenes to be able to be used later */}
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
