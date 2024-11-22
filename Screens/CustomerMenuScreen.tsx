import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';

// Global menu items
let menuItems = [
  { id: "1", name: "Spaghetti", category: "Main", price: "R80" },
  { id: "2", name: "Caesar Salad", category: "Starter", price: "R40" },
  { id: "3", name: "Chocolate Cake", category: "Dessert", price: "R50" },
];

const CustomerMenuScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* Display the logo image */}
      <Image
        source={require('../assets/Logo_Fresh_Cafe-removebg-preview.png')} 
        style={styles.logo}
      />
      
      <Text style={styles.title}>Customer Menu</Text>
      
      {/* Navigate to Filter Screen */}
      <Button
        title="Filter by Course"
        onPress={() => navigation.navigate("FilterMenuScreen")}
        color="#735D51" // Button color
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
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items available.</Text>}
      />
    </View>
  );
};

export default CustomerMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1A2622", // Background color of the page
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff", // White color for title text
    textAlign: 'center',
  },
  logo: {
    width: 150, // Set width for the image
    height: 150, // Set height for the image
    marginBottom: 20, // Space between image and other content
    alignSelf: 'center', // Center the image horizontally
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
    color: "#fff", // White text color for item names
  },
  itemPrice: {
    fontSize: 18,
    color: "#aaa", // Lighter color for item prices
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});

