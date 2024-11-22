import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { globalMenuItems } from "./GlobalState";

const CustomerMenuScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Menu</Text>
      <FlatList
        data={globalMenuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.name}</Text>
            <Text>{item.category}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CustomerMenuScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  menuItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
});

