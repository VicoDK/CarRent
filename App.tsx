import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthProvider } from "./AuthContext";

import Home from "./Home";
import Cars from "./Cars";
import LookingAtCar from "./LookingAtCar";
import CarOdered from "./CarOdered";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cars" component={Cars} />
        <Stack.Screen name ="LookingAtCar" component={LookingAtCar}/>
        <Stack.Screen name ="CarOdered" component={CarOdered}/>
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
