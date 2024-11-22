import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

// Global variable to store menu items
let globalMenuItems: MenuItem[] = [];

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: string;
}

// Function to calculate average price for a category
const calculateAveragePrice = (category: string): string => {
  let totalPrice = 0;
  let count = 0;

  // Use for loop
  for (let i = 0; i < globalMenuItems.length; i++) {
    if (globalMenuItems[i].category === category) {
      const price = parseFloat(globalMenuItems[i].price.replace("R", "")) || 0;
      totalPrice += price;
      count++;
    }
  }

  return count > 0 ? (totalPrice / count).toFixed(2) : "0";
};

// Function to filter menu items by category
const filterMenuItemsByCategory = (category: string): MenuItem[] => {
  const filteredItems: MenuItem[] = [];

  // Use while loop
  let index = 0;
  while (index < globalMenuItems.length) {
    if (globalMenuItems[index].category === category) {
      filteredItems.push(globalMenuItems[index]);
    }
    index++;
  }

  return filteredItems;
};

const ChefMenuScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("starter");
  const [items, setItems] = useState([
    { label: "Starter", value: "starter" },
    { label: "Main", value: "main" },
    { label: "Dessert", value: "dessert" },
    { label: "Refreshments", value: "refreshments" },
  ]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Update global menu items and local state when navigating from EditMenuScreen
  useEffect(() => {
    if (route.params?.menuItems) {
      globalMenuItems = route.params.menuItems; // Update global variable
      setMenuItems(globalMenuItems);
    }
  }, [route.params?.menuItems]);

  const handleRemoveItem = (id: string): void => {
    Alert.alert("Confirm Delete", "Are you sure you want to remove this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          globalMenuItems = globalMenuItems.filter((item) => item.id !== id); // Update global variable
          setMenuItems(globalMenuItems); // Update local state
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require('../assets/Logo_Fresh_Cafe-removebg-preview.png')} // Adjust the path as per your structure
        style={styles.logo}
      />

      <Text style={styles.title}>Chef's Menu</Text>

      {/* Back Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Back to First Screen</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Menu Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditMenu", {
              menuItems,
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Picker */}
      <DropDownPicker
        open={open}
        value={selectedCategory}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedCategory}
        setItems={setItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Average Price */}
      <View style={styles.averagePriceContainer}>
        <Text style={styles.averagePriceText}>
          Average Price for {selectedCategory}: R{calculateAveragePrice(selectedCategory)}
        </Text>
      </View>

      {/* Menu List */}
      <FlatList
        data={filterMenuItemsByCategory(selectedCategory)} // Use filtered menu items
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>{item.price}</Text>
            <TouchableOpacity
              onPress={() => handleRemoveItem(item.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No items in this category</Text>}
      />

      {/* Entire Menu Empty State */}
      {globalMenuItems.length === 0 && (
        <Text style={styles.emptyText}>No items have been added to the menu yet.</Text>
      )}
    </View>
  );
};

export default ChefMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2622", // Background color of the page
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
  dropdown: {
    marginBottom: 20,
    borderColor: "#ccc",
    backgroundColor: "#fff", // Set background for the dropdown
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
  averagePriceContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  averagePriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // White text for average price
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItemText: {
    fontSize: 16,
    color: "#fff", // White text for menu items
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text for price
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff", // White text for empty state
    marginTop: 20,
  },
  buttonWrapper: {
    marginBottom: 15, // Adds space between buttons
  },
  button: {
    backgroundColor: "#735D51", // Custom color for the button
    borderRadius: 25, // Curved corners
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // White text for button text
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  removeButtonText: {
    color: "#fff", // White text for the remove button
  },
});
