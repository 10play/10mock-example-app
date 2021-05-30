import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {RootStackParamList, ThemeType} from '../types';
import {SideBar} from '../components';
import {Home, Cocktail, Categories, CocktailsList} from '../screens';
import {useTheme} from '../contexts';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const getHeaderStyle = (currentTheme: ThemeType) => ({
  headerStyle: {
    backgroundColor: currentTheme === 'dark' ? '#242526' : '#FFFFFF',
  },
  headerTitleStyle: {
    color: currentTheme === 'dark' ? '#FFFFFF' : 'black',
  },
  headerTintColor: currentTheme === 'dark' ? '#FFFFFF' : 'black',
});

export function PublicRoutes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition="right"
        drawerContent={(props) => <SideBar {...props} />}>
        <Drawer.Screen name="stack" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const MainStack = () => {
  const {currentTheme} = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          title: 'Home',
          ...getHeaderStyle(currentTheme),
          headerRight: () => (
            <Hamburger navigation={navigation} theme={currentTheme} />
          ),
        })}
      />
      <Stack.Screen
        name="Cocktail"
        component={Cocktail}
        options={({navigation}) => ({
          title: 'Cocktail info',
          ...getHeaderStyle(currentTheme),
          headerRight: () => (
            <Hamburger navigation={navigation} theme={currentTheme} />
          ),
        })}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={({navigation}) => ({
          title: 'Categories',
          ...getHeaderStyle(currentTheme),
          headerRight: () => (
            <Hamburger navigation={navigation} theme={currentTheme} />
          ),
        })}
      />
      <Stack.Screen
        name="CocktailsList"
        component={CocktailsList}
        options={({navigation}) => ({
          title: 'List of cocktails',
          ...getHeaderStyle(currentTheme),
          headerRight: () => (
            <Hamburger navigation={navigation} theme={currentTheme} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const Hamburger = (
  {navigation, theme}: {navigation: any; theme: ThemeType}, //hamburger icon drawer toggler
) => (
  <Icon
    name="navicon"
    style={{
      marginRight: 10,
      color: theme === 'dark' ? 'white' : 'black',
    }}
    size={30}
    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
  />
);
