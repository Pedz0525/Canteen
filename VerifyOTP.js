import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const VerifyOTP = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, otp: sentOtp } = route.params; // Get the email and sent OTP from params
  const [inputOtp, setInputOtp] = useState(""); // State for user input OTP

  const handleVerifyOtp = () => {
    if (inputOtp === sentOtp) {
      Alert.alert("Success", "OTP verified successfully!");
      navigation.navigate("ResetPassword", { email }); // Navigate to ResetPassword
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Verify OTP</Text>
      <Text style={{ marginBottom: 10 }}>Enter the OTP sent to {email}:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
          backgroundColor: "#fff",
        }}
        placeholder="Enter OTP"
        value={inputOtp}
        onChangeText={setInputOtp}
        keyboardType="numeric" // Optional: restrict input to numbers
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} color="#ff4c4c" />
    </View>
  );
};

export default VerifyOTP;
