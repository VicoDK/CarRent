
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import styles from './styles/styles';
import LoginForm from './Components/LoginForm';

type HomeScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigation>();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('Something wrong');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Best Car Rental</Text>

      <Button
        title="View Car Selection"
        onPress={() => {
          navigation.navigate('Cars');
          auth.setIsLoggedIn(false);
        }}
      />

      <View style={styles.line} />

      <LoginForm
        onLogin={() => {
          navigation.navigate('Cars');
          auth.setIsLoggedIn(true);
        }}
        onSignUp={() => {
          navigation.navigate('Cars');
          auth.setIsLoggedIn(true);
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}