import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from './screens/Home'
import AdminDashboard from './screens/Admin/AdminDashboard';
import GenerateReport from './screens/Admin/GenerateReport';
import EmployeeDash from './screens/Employee/EmployeeDash'
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:false
        }}>
           {/* <Stack.Screen 
            name='home'
            component={Login}
          /> 
          <Stack.Screen 
            name='adminDash'
            component={AdminDashboard}
          />
          <Stack.Screen 
            name='report'
            component={GenerateReport}
          /> */}
          <Stack.Screen 
            name='employee'
            component={EmployeeDash}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
