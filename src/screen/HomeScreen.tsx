import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.text}>Name: {user?.name}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 10 },
});