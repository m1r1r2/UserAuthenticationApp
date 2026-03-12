import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { useAuth } from '../context/AuthContext';
import PasswordInput from '../component/PasswordInput';
import { isValidEmail } from '../util/validator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
  
    if (!isValidEmail(email)) {
      setError('Invalid email format.');
      return;
    }
  
    if (!password) {
      setError('Password is required.');
      return;
    }
  
    const response = await login({ email, password });
  
    if (!response.success) {
      setError(response.message || 'Login failed');
      return;
    }
  
    Alert.alert('Success', 'Logged in successfully');
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <PasswordInput value={password} onChangeText={setPassword} />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
  link: { marginTop: 16, color: 'blue', textAlign: 'center' },
});