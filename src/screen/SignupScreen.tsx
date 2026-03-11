import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { useAuth } from '../context/AuthContext';
import PasswordInput from '../component/PasswordInput';
import { isValidEmail, isValidPassword } from '../util/validator';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');

    if (!name || !email || !password) {
      setError('Missing fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password length must be at least 6 characters.');
      return;
    }

    const response = await signup({ name, email, password });

    if (!response.success) {
      setError(response.message || 'Signup failed');
      return;
    }

    Alert.alert('Success', 'Signup successful');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <PasswordInput value={password} onChangeText={setPassword}/>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Button title="Signup" onPress={handleSignup} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

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