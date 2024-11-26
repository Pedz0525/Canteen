import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

export default function EVSU_Canteen_Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(
    "Checking connection..."
  );

  const checkConnection = async () => {
    try {
      console.log("Checking connection...");
      const response = await fetch("http://192.168.254.111:3000/status");
      const data = await response.json();
      console.log("Connection response:", data);
      setConnectionStatus("Connected to server ✅");
    } catch (error) {
      console.log("Connection error:", error);
      setConnectionStatus("Not connected to server ❌");
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting login...");
      const response = await fetch("http://192.168.254.111:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      console.log("Login response received");
      const data = await response.json();
      console.log("Login data:", data);

      if (data.success) {
        navigation.replace("Stud_Dashboard");
      } else {
        Alert.alert(
          "Login Failed",
          data.message || "Invalid username or password"
        );
      }
    } catch (error) {
      console.error("Detailed Error:", error);
      Alert.alert(
        "Connection Error",
        "Could not connect to server. Please make sure:\n\n" +
          "1. Your server is running\n" +
          "2. You're on the same WiFi network\n" +
          "3. The IP address is correct (192.168.254.111)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./assets/bg_img.png")}
          style={styles.backgroundImage}
        />
      </View>

      <View style={styles.formContainer}>
        <Image source={require("./assets/EvsuLOGO.png")} style={styles.logo} />
        <Text style={styles.title}>EVSU CANTEEN</Text>
        <Text style={styles.connectionStatus}>{connectionStatus}</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username or Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username or email"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.link} onPress={() => navigation.navigate("Forgot")}>
          Forget Password
        </Text>
        <Text style={styles.text}>
          Don't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
  return;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    height: "33%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
    alignItems: "center",
    marginTop: -30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 24,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    color: "#333",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ff4c4c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    color: "#ff4c4c",
    fontWeight: "bold",
    marginTop: 12,
  },
  text: {
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  connectionStatus: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 12,
    color: "#666",
  },
});
