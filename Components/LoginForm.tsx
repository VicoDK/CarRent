import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import styles from '../styles/styles';

type LoginFormProps = {
  onLogin: (username: string, password: string) => void;
  onSignUp: (username: string, password: string) => void;
};

function isLoginInputValid(username: string, password: string): boolean {
  return username.trim().length > 0 && password.length > 0;
}

export default function LoginForm({ onLogin, onSignUp }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (!isLoginInputValid(username, password)) {
      setError('Enter both your username and password.');
      return;
    }

    setError('');
    onLogin(username.trim(), password);
  }

    function handleSignUp() {
    if (!isLoginInputValid(username, password)) {
      setError('Enter both your username and password.');
      return;
    }

    setError('');
    onSignUp(username.trim(), password);
  }

  return (
    <View>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.Input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.Input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text>{error}</Text> : null}

      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Sign-up" onPress={handleSignUp} />
    </View>
  );
}