
import { Button, Text, TextInput, View } from 'react-native';
import styles from '../styles/styles';

type LoginFormProps = {
  onLogin: () => void;
  onSignUp: () => void;
};

export default function LoginForm({
  onLogin,
  onSignUp,
}: LoginFormProps) {
  return (
    <View>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.Input}
        placeholder="UserName"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.Input}
        placeholder="Password"
        secureTextEntry
      />

      <Button title="Login" onPress={onLogin} />
      <Button title="Sign-up" onPress={onSignUp} />
    </View>
  );
}