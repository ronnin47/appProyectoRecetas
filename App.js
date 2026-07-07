import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { AppProvider } from './provider/AppProvider';
//icons
import { Ionicons } from '@expo/vector-icons';

// navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// componentes
import { PantallaHome } from './components/pantallaHome';
import {PantallaMisRecetas} from './components/pantallaMisRecetas';
import {PantallaConfiguracion} from './components/pantallaConfiguracion';
import {DetalleReceta} from './components/detalleReceta';
import { PantallaCargarReceta } from './components/pantallaCargarReceta';
import { EditarReceta } from './components/editarReceta';



// ---------- STACK HOME ----------
const StackHome = () => {

//'#2d2c30',
//  borderTopColor: '#E0D6C3',
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2d2c30',
          borderBottomWidth: 1,
          borderBottomColor: '#e6af4a',
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="Inicio"
        component={PantallaHome}
        options={{ title: 'Inicio' }}
      />

      
      <Stack.Screen
        name="DetalleReceta"
        component={DetalleReceta}
        options={{ title: 'Detalle de Receta' }}
      />  

    </Stack.Navigator>
  );
};

const StackMisRecetas = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 1,
          borderBottomColor: '#4ae6d9',
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="pantallaMisRecetas"
        component={PantallaMisRecetas}
        options={{ title: 'Mis Recetas' }}
      />
     

      <Stack.Screen
        name="pantallaCargarReceta"
        component={PantallaCargarReceta}
        options={{ title: 'Tu nueva receta' }}
      />

       <Stack.Screen
        name="DetalleReceta"
        component={DetalleReceta}
        options={{ title: 'Detalle de Receta' }}
      />  

      <Stack.Screen
        name="editarReceta"
        component={EditarReceta}
        options={{ title: 'Edicion de tu Receta' }}
      />  

    </Stack.Navigator>
  );
};

const StackConfiguracion = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 1,
          borderBottomColor: '#4ae6d9',
        },
        headerTintColor: 'white',
      }}
    >


      <Stack.Screen
        name="Configuracion"
        component={PantallaConfiguracion}
        options={{ title: 'Configuración' }}
      />

    </Stack.Navigator>
  );
};







// ---------- APP ----------
export default function App() {

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', height: 100 }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 18,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{ height: 80 }}
      text1Style={{ fontSize: 18 }}
      text2Style={{ fontSize: 15 }}
    />
  ),
};
  return (
    <AppProvider>

      <NavigationContainer>


      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
  backgroundColor: '#2d2c30',
  borderTopColor: '#E0D6C3',
  borderTopWidth: 1,
},
tabBarActiveTintColor: '#E67E22',
tabBarInactiveTintColor: '#fcfbfb',
        }}
      >

      
       <Tab.Screen
  name="StackHome"
  component={StackHome} 
  options={{ 
    title: 'Inicio',
    tabBarLabel: 'Inicio',
    tabBarIcon: ({ color, size, focused }) => (
      <Ionicons
        name={focused ? 'home' : 'home-outline'}
        size={size}
        color={color}
      />
    ),
  }}
/>





        <Tab.Screen
          name="StackMisRecetas"
          component={StackMisRecetas}
          options={{ title: 'Mis Recetas',
             tabBarLabel: 'Mis Recetas',
            tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? 'pizza' : 'pizza-outline'}
            size={size}
            color={color}
          />
        ),
           }}
        />






        <Tab.Screen
          name="StackConfiguracion"
          component={StackConfiguracion}
          options={{ title: 'Configuración',
            tabBarLabel: 'Configuración',
            tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? 'settings' : 'settings-outline'}
            size={size}
            color={color}
          />
        ),
           }}
        />

      </Tab.Navigator>
    
  
    
    </NavigationContainer>

    
    
       <Toast config={toastConfig} />
    </AppProvider>
   
  );
}



