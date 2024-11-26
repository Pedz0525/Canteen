// EVSU_Canteen_Forgot.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import emailjs from "emailjs-com";

const EVSU_Canteen_Forgot = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    const otp = generateOTP();
    console.log("Forgot Password form submitted:", { email, otp });

    const trimmedEmail = email.trim();
    console.log("Trimmed Email:", trimmedEmail);

    if (!validateEmail(trimmedEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (trimmedEmail === "") {
      Alert.alert("Error", "Email cannot be empty.");
      return;
    }

    try {
      await sendVerificationEmail(trimmedEmail, otp);
      Alert.alert("Success", "OTP has been sent to your email.");
      navigation.navigate("VerifyOTP", { email: trimmedEmail, otp: otp });
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP. Please try again.");
      console.error("Email sending failed:", error);
    }
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = async (email, otp) => {
    const serviceID = "service_313j0pv";
    const templateID = "template_cei97ub";
    const userID = "zT6IfLeNlS6m0Eayh";

    const templateParams = {
      email: email,
      otp: otp,
    };

    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        userID
      );
      console.log("Email sent successfully:", response);
      return response;
    } catch (error) {
      console.error("Email sending failed:", error);
      throw error;
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <ImageBackground
      source={require("./assets/bg_img.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Forgot Password</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Button
            title="Send OTP"
            onPress={handleForgotPassword}
            color="#ff4c4c"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

export default EVSU_Canteen_Forgot;
