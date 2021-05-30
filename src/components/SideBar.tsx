import React from 'react';
import styled from 'styled-components';
import {Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import IconTwo from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import {useTheme} from '../contexts/StyleProvider';

export function SideBar({navigation}: {navigation: any}) {
  const {toggleTheme, isDark} = useTheme();

  const getToggleIconName = (): string => (isDark ? 'moon' : 'sun');

  const getToggleIconColor = (): string => (isDark ? 'blue' : 'yellow');

  const getRouteIconColor = (): string => (isDark ? 'white' : 'black');

  const handleNavigation = (route: string): void => {
    switch (route) {
      case 'Categories':
        navigation.navigate('Categories', {query: 'c'});
        break;
      case 'Glasses':
        navigation.navigate('Categories', {query: 'g'});
        break;
      case 'Ingredients':
        navigation.navigate('Categories', {query: 'i'});
        break;
      default:
        navigation.navigate(route);
        break;
    }
  };

  return (
    <SideBarContainer>
      <ThemeToggle>
        {/* @ts-ignore */}
        <Switch value={isDark} onValueChange={toggleTheme} />
        <Icon
          size={28}
          name={getToggleIconName()}
          color={getToggleIconColor()}
        />
      </ThemeToggle>
      <RouteLink onPress={() => handleNavigation('Home')}>
        <Icon size={28} name="home" color={getRouteIconColor()} />
        <RouteLinkText>Home</RouteLinkText>
      </RouteLink>
      <RouteLink onPress={() => handleNavigation('Categories')}>
        <Icon size={28} name="grid" color={getRouteIconColor()} />
        <RouteLinkText>Categories</RouteLinkText>
      </RouteLink>
      <RouteLink onPress={() => handleNavigation('Glasses')}>
        <IconTwo
          size={28}
          name="glass-martini-alt"
          color={getRouteIconColor()}
        />
        <RouteLinkText>Glasses Categories</RouteLinkText>
      </RouteLink>
      <RouteLink onPress={() => handleNavigation('Ingredients')}>
        <IconTwo size={28} name="atom" color={getRouteIconColor()} />
        <RouteLinkText>Ingredients</RouteLinkText>
      </RouteLink>
    </SideBarContainer>
  );
}

const RouteLinkText = styled(Text)`
  color: ${({theme}) => theme.colors.font};
  font-size: 18px;
  margin-left: 6px;
`;

const RouteLink = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.task};
`;

const ThemeToggle = styled(View)`
  flex-direction: row;
  margin-top: 20px;
  align-self: center;
  width: 100px;
  justify-content: space-around;
`;

const SideBarContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.sideBar};
`;
