import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FirstScreen from "./Screens/FirstScreen";
import EditMenuScreen from "./Screens/EditMenuScreen";
import ChefMenuScreen from "./Screens/ChefMenuScreen";
import CustomerMenuScreen from "./Screens/CustomerMenuScreen";


const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="First" component={FirstScreen} />
        <Drawer.Screen name="Chef" component={ChefMenuScreen} />
        <Drawer.Screen name="EditMenu" component={EditMenuScreen} />
        <Drawer.Screen name="Customer" component={CustomerMenuScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
