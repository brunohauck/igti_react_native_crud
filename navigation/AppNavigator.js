import React from 'react';
import { createAppContainer, createStackNavigator,createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import EditScreen from '../screens/EditScreen';
import { HeaderBackButton } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';


const EditStack = createStackNavigator({ 
  
  Login: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
      title: 'Login',
    })
  },
  Main: {
    screen: MainTabNavigator,
    navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
      header: null
    })
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
      title: 'Edit',
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('HomeStack')} />
    })
  }
});

export default createAppContainer(createSwitchNavigator({
  MainComponent: EditStack
}));