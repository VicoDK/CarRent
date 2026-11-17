import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthContext } from './AuthContext';
import { useContext, type ContextType  } from 'react';
import styles from './styles/styles';
import LoginForm from './Components/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';



type HomeScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type LoginFormProps = {
  onLogin: (username: string, password: string) => void;
  onSignUp: (username: string, password: string) => void;
};


export default function Home() {
  const navigation = useNavigation<HomeScreenNavigation>();
  const auth = useContext(AuthContext);
  
  if (!auth) {
    throw new Error('Home must be rendered inside AuthProvider');
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Best Car Rental</Text>

      <Button
        title="View Car Selection"
        onPress={() => {
          ViewCars();
        }}
      />

      <View style={styles.line} />

      <LoginForm
        onLogin={(username, password) => login(username, password, auth, navigation)}
        onSignUp={(username, password) => SignUp(username, password, auth, navigation)}
      />

      <Button
        title="Reset users and bookings"
        onPress={() => resetUsersAndBookings(auth)}
      />


      <StatusBar style="auto" />
    </View>
  );
}

async function clearBookings() {
    await AsyncStorage.removeItem("bookings");
}

async function login(username : string, Password : string, auth : NonNullable<ContextType<typeof AuthContext>>, navigation : HomeScreenNavigation)
{
  const stored = await AsyncStorage.getItem('users');
  const users: { UserName: string; Password: string }[]  = stored ? JSON.parse(stored) : [];


  if (!auth) {
    throw new Error('Something wrong');
  }

  if (!PasswordCheck(Password))
  {
    console.log("Password not valid");
    return;
  }

  const user = users.find(
    item =>
      item.UserName.toLowerCase() === username.trim().toLowerCase() &&
      item.Password === Password
  );

  if (!user) {
    console.log('Username or password is incorrect');
    return;
  }

  auth.setIsLoggedIn(true);
  auth.setCurrentUser(user.UserName);
  navigation.navigate('Cars');

}




async function SignUp(username : string, Password : string, auth : NonNullable<ContextType<typeof AuthContext>>, navigation : HomeScreenNavigation)
{


    if (!PasswordCheck(Password))
    {
      console.log("Password not valid");
      return;
    }
    
    //checkData If name is there
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const usernameExists = users.some(
      (user: { UserName: string }) =>
        user.UserName.toLowerCase() === username.trim().toLowerCase()
    );

    if (usernameExists) {
      console.log("User exist");
      return; // Stop sign-up; don't add the user
    }

    
    //make user and login
    const user = {
      id: Date.now().toString(),
      UserName: username,
      Password: Password,
    };


    users.push(user);
    await AsyncStorage.setItem('users', JSON.stringify(users));

    
    //pass

    auth.setCurrentUser(user.UserName);
    auth.setIsLoggedIn(true);
    navigation.navigate('Cars');


}

function ViewCars()
{
    const auth = useContext(AuthContext);

    if (!auth) {
      throw new Error('Something wrong');
    }

    auth.setIsLoggedIn(false);
    navigation.navigate('Cars');
}

function PasswordCheck(password: string ): boolean
{

 
  if (password.length < 8)
  {
    return false;
  }

  if (!/[a-z]/.test(password))
  {
    return false;
  }

   if (!/[A-Z]/.test(password))
  {
    return false;
  }


  return true;


}

 async function resetUsersAndBookings(auth: NonNullable<ContextType<typeof AuthContext>>) {


    await AsyncStorage.multiRemove(['users', 'bookings']);
    auth.setCurrentUser(null);
    auth.setIsLoggedIn(false);
  }