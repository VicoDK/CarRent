import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthProvider } from "./AuthContext";

import Home from "./Home";
import Cars from "./Cars";
import LookingAtCar from "./LookingAtCar";
import CarOdered from "./CarOdered";

const Stack = createNativeStackNavigator<RootStackParamList>(); {/*makes a kinda list for all scenes and is used to go thogh the scenes*/}




export default function App() {
  return (
    <AuthProvider> {/*makes sure that the program have acces to the auth logged in data*/}
    <NavigationContainer> {/*makes the group for the scenes*/}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cars" component={Cars} />
        <Stack.Screen name ="LookingAtCar" component={LookingAtCar}/>
        <Stack.Screen name ="CarOdered" component={CarOdered}/>
        {/*registers all scenes to be able to be used later */}
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
