import { StyleSheet, Text, View, FlatList, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: string;
}

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

  // Update menu items when navigating from EditMenuScreen
  useEffect(() => {
    if (route.params?.menuItems) {
      setMenuItems(route.params.menuItems);
    }
  }, [route.params?.menuItems]);

  const calculateAveragePrice = (category: string) => {
    const categoryItems = menuItems.filter((item) => item.category === category);
    if (categoryItems.length === 0) return 0;

    const total = categoryItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("R", "")) || 0;
      return sum + price;
    }, 0);
    return (total / categoryItems.length).toFixed(2);
  };

  const filteredMenuItems = menuItems.filter((item) => item.category === selectedCategory);

  const handleRemoveItem = (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to remove this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>

      {/* Back Button */}
      <Button
        title="Back"
        onPress={() => navigation.goBack()}
        color="#2196F3"
      />

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
        data={filteredMenuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>{item.price}</Text>
            <Button title="Remove" onPress={() => handleRemoveItem(item.id)} color="red" />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in this category</Text>
        }
      />

      {/* Entire Menu Empty State */}
      {menuItems.length === 0 && (
        <Text style={styles.emptyText}>
          No items have been added to the menu yet.
        </Text>
      )}
    </View>
  );
};

export default ChefMenuScreen;

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
  dropdown: {
    marginBottom: 20,
    borderColor: "#ccc",
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
    color: "#555",
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
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});

