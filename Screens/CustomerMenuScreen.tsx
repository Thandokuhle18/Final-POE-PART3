import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";

// Global menu items
let menuItems = [
  { id: "1", name: "Spaghetti", category: "Main", price: "R80" },
  { id: "2", name: "Caesar Salad", category: "Starter", price: "R40" },
  { id: "3", name: "Chocolate Cake", category: "Dessert", price: "R50" },
];

const CustomerMenuScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Menu</Text>
      
      {/* Navigate to Filter Screen */}
      <Button
        title="Filter by Course"
        onPress={() => navigation.navigate("FilterMenuScreen")}
      />

      {/* List of menu items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No menu items available.</Text>}
      />
    </View>
  );
};

export default CustomerMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    color: "#555",
  },
});

