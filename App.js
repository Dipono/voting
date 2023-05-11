import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Login from './screens/Home'
import AdminDashboard from "./screens/Admin/AdminDashboard";
import GenerateReport from "./screens/Admin/GenerateReport";
import EmployeeDash from "./screens/Employee/Employee";
import ActiveVote from "./screens/Employee/ActiveVote";
import Results from "./screens/Employee/History";
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="admin" component={AdminDashboard} />
        <Stack.Screen name="home" component={Login} />
        <Stack.Screen name="report" component={GenerateReport} />
        <Stack.Screen name="employee" component={EmployeeDash} />
        <Stack.Screen name="active" component={ActiveVote} />
        <Stack.Screen name="results" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
