import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
}

const globalMenu: { menuItems: MenuItem[] } = {
  menuItems: [],
};

const EditMenuScreen = ({ navigation }: { navigation: any }) => {
  const [dishName, setDishName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("starter");
  const [open, setOpen] = useState<boolean>(false);

  const categories = [
    { label: "Starter", value: "starter" },
    { label: "Main", value: "main" },
    { label: "Dessert", value: "dessert" },
    { label: "Refreshments", value: "refreshments" },
  ];

  // Function to add a new dish to the menu
  const addDishToMenu = (dish: MenuItem) => {
    globalMenu.menuItems.push(dish);
  };

  // Function to validate inputs
  const validateInputs = (): boolean => {
    if (!dishName || !description || !price || !selectedCategory) {
      Alert.alert("Error", "Please fill in all fields.");
      return false;
    }
    return true;
  };

  // Handle saving a new dish
  const handleSaveDish = () => {
    if (!validateInputs()) return;

    const newDish: MenuItem = {
      id: Date.now().toString(),
      name: dishName,
      description,
      category: selectedCategory,
      price: `R${price}`,
    };

    // Add the new dish
    addDishToMenu(newDish);

    // Navigate to ChefMenuScreen
    navigation.navigate("Chef", { menuItems: globalMenu.menuItems });

    // Clear the inputs
    setDishName("");
    setDescription("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require('../assets/Logo_Fresh_Cafe-removebg-preview.png')} // Adjust the path as per your structure
        style={styles.logo}
      />

      <Text style={styles.title}>Edit Menu</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dish Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (e.g., 10)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <DropDownPicker
        open={open}
        value={selectedCategory}
        items={categories}
        setOpen={setOpen}
        setValue={setSelectedCategory}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      
      {/* Custom Styled Button */}
      <TouchableOpacity style={styles.button} onPress={handleSaveDish}>
        <Text style={styles.buttonText}>Save Dish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2622", // Background color for the entire page
    padding: 20,
  },
  logo: {
    width: 150, // Width of the image
    height: 150, // Height of the image
    alignSelf: 'center', // Center the logo horizontally
    marginBottom: 20, // Add margin to the bottom of the logo
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff", // White text for the title
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "#fff", // White text for input fields
    backgroundColor: "#333", // Darker input field background
  },
  dropdown: {
    marginBottom: 20,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#735D51", // Custom button color
    borderRadius: 25, // Curved corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20, // Space between the button and inputs
  },
  buttonText: {
    color: "#fff", // White text for the button
    fontSize: 16,
  },
});


