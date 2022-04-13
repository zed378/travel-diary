// import packages
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Home from "./screens/Home";
import AddDiary from "./screens/AddDiary";
import Bookmark from "./screens/Bookmark";
import DetailDiary from "./screens/DetailDiary";
import Profile from "./screens/Profile";

// create navigator
const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    avenir: require("./assets/fonts/avenir.otf"),
    avenirs: require("./assets/fonts/avenirs.otf"),
    product: require("./assets/fonts/product.ttf"),
    roboto: require("./assets/fonts/roboto.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerMode: "screen",
            headerTintColor: "#2e86de",
            headerStyle: { backgroundColor: "#FFF" },
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Register",
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
            }}
          />
          <Stack.Screen
            name="AddDiary"
            component={AddDiary}
            options={{
              title: "Add Diary",
            }}
          />
          <Stack.Screen
            name="Bookmark"
            component={Bookmark}
            options={{
              title: "Bookmark",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "Profile",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
