import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
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

  // Function to display all menu items (using a for loop)
  const displayMenuItems = () => {
    console.log("Current Menu Items:");
    for (let i = 0; i < globalMenu.menuItems.length; i++) {
      console.log(globalMenu.menuItems[i]);
    }
  };

  // Function to display menu items using a while loop
  const displayMenuItemsWhile = () => {
    console.log("Displaying Menu Items (while loop):");
    let index = 0;
    while (index < globalMenu.menuItems.length) {
      console.log(globalMenu.menuItems[index]);
      index++;
    }
  };

  // Function to display menu item keys (using a for-in loop)
  const displayMenuKeys = () => {
    console.log("Keys of Menu Items:");
    for (const key in globalMenu.menuItems[0] || {}) {
      console.log(key);
    }
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

    // Display the menu using various loops
    displayMenuItems();
    displayMenuItemsWhile();
    displayMenuKeys();

    // Navigate to ChefMenuScreen
    navigation.navigate("Chef", { menuItems: globalMenu.menuItems });

    // Clear the inputs
    setDishName("");
    setDescription("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
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
      <Button title="Save Dish" onPress={handleSaveDish} />
    </View>
  );
};

export default EditMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dropdown: {
    marginBottom: 20,
    borderColor: "#ccc",
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
});

