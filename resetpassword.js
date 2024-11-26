import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const ResetPassword = ({ route }) => {
  const { email } = route.params; // Get the email from params
  const [username, setUsername] = useState(""); // State for username
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password

  const handleResetPassword = () => {
    // Validate the new password and confirm password
    if (newPassword === "") {
      Alert.alert("Error", "New password cannot be empty.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Implement your password reset logic here
    // For example, you might want to send the new password to your backend
    Alert.alert("Success", "Password has been reset successfully!");

    // Optionally, navigate to the login screen or another screen after resetting
    // navigation.navigate("Login"); // Uncomment if you have a Login screen
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Reset Password</Text>
      <Text style={{ marginBottom: 10 }}>Username:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
          backgroundColor: "#fff",
        }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={{ marginBottom: 10 }}>New Password:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
          backgroundColor: "#fff",
        }}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry // Hide password input
      />
      <Text style={{ marginBottom: 10 }}>Confirm Password:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
          backgroundColor: "#fff",
        }}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry // Hide password input
      />
      <Button
        title="Reset Password"
        onPress={handleResetPassword}
        color="#ff4c4c"
      />
    </View>
  );
};

export default ResetPassword;
