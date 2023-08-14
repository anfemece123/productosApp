import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminNavigator from './AdminNavigator';

 const Drawer = createDrawerNavigator();

 export const MenuLateralBasico= ()=> {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="AdminNavigator" component={AdminNavigator} />
   
    </Drawer.Navigator>
  );
}