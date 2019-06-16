import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import AddScreen from '../screens/AddScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AboutStack = createStackNavigator({
  Links: AboutScreen,
});

AboutStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const AddEditStack = createStackNavigator({
  Settings: AddScreen,
});

AddEditStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};
/*
const EditStack = createStackNavigator({ 
  Edit: {
    screen: EditScreen,
    navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
      title: 'Edit',
      tabBarVisible: false,
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('HomeStack')} />
    }),
  }
});*/
export default createBottomTabNavigator({
  HomeStack,
  AboutStack,
  AddEditStack,
}
  
);
