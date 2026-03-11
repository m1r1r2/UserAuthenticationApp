import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const PasswordInput = ({
  value,
  onChangeText,
  placeholder = "Password",
}: Props) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
      />

      <TouchableOpacity onPress={() => setSecure(!secure)}>
        <Icon
          name={secure ? "eye-off" : "eye"}
          size={22}
          color="#555"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
});