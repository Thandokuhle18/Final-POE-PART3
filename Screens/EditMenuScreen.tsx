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

const EditMenuScreen = ({ navigation }: { navigation: any }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
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

  const handleSaveDish = () => {
    if (!dishName || !description || !price || !selectedCategory) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newDish: MenuItem = {
      id: Date.now().toString(),
      name: dishName,
      description,
      category: selectedCategory,
      price: `R${price}`,
    };

    const updatedMenuItems = [...menuItems, newDish];
    setMenuItems(updatedMenuItems);

    // Navigate to ChefMenuScreen and pass menu items
    navigation.navigate("Chef", { menuItems: updatedMenuItems });

    // Clear input fields
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