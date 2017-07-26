// @flow
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
// Pages
import HomePage from '../home/HomePage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import OfflinePage from '../offline/OfflinePage';
import SignInPage from '../auth/SignInPage';
import Setting from '../setting/Setting';
import Shop from '../shop/Shop';
import Designers from '../designers/Designers';
import NavigatorTabNew from '../new/navigationConfiguration';

const routeConfiguration = {
  Home: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-home-outline" size={32} color={tintColor} />,
    },
  },
  New: {
    screen: NavigatorTabNew,
    navigationOptions: {
      tabBarLabel: "What's new",
      tabBarIcon: ({ tintColor }) => <Octicons name="gift" size={32} color={tintColor} />,
    },
  },
  Designers: {
    screen: Designers,
    navigationOptions: {
      tabBarLabel: 'Designers',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-football" size={32} color={tintColor} />,
    },
  },
  Shop: {
    screen: Shop,
    navigationOptions: {
      tabBarLabel: 'Shop',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-menu-outline" size={32} color={tintColor} />,
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarLabel: 'Setting',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-contact" size={32} color={tintColor} />,
    },
  },
};

const tabBarConfiguration = {
  // ...other configs
  tabBarOptions: {
    // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
    // background color is for the tab component
    // activeBackgroundColor: 'blue',
    // inactiveBackgroundColor: 'white'
  },
};

export const TabBar = TabNavigator(routeConfiguration, tabBarConfiguration);
