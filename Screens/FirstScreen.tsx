import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const FirstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require('../assets/Logo_Fresh_Cafe-removebg-preview.png')} // Adjust the path based on your project structure
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome! Please select Your Role</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chef")}
        >
          <Text style={styles.buttonText}>I am the Chef</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Customer")}
        >
          <Text style={styles.buttonText}>I am the Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A2622", // Background color of the whole page
    padding: 20, // Add some padding for better spacing
  },
  logo: {
    width: 400, // Width of the logo
    height: 400, // Height of the logo
    marginBottom: 30, // Adds space below the logo
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30, // Increased space between title and buttons
    color: "#fff", // White text for the title
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
    height: 140, // Adjusted height to give more space between buttons
  },
  button: {
    backgroundColor: "#735D51", // Button background color
    borderRadius: 25, // Curved corners
    paddingVertical: 15, // Padding for vertical size
    paddingHorizontal: 20, // Padding for horizontal size
    marginBottom: 15, // Adds space between the buttons
    alignItems: "center", // Centers the text in the button
  },
  buttonText: {
    color: "#fff", // White text color for the button text
    fontSize: 16, // Adjusted font size for better readability
  },
});
