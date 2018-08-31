import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, Text, View} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import InputBox from './InputBox';
import CustomButton from './CustomButton';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import CardComp from './CardComp';
import SettingPage from './SettingPage';
import ApiList from './ApiList';
import {Icon} from 'react-native-elements';
import NavScreen from './NavScreen';




export default class App extends Component{
  render() {
    return (
      <StackNav></StackNav>
    );
  }
}
class TabContainer extends Component {
  render() {
    return (
      <MyTab></MyTab>
    );
  }
}
const StackNav = createStackNavigator({
  NavScreen:NavScreen,
  Login:SignIn,
  SignUp:SignUp,
  TabScreen: {
    screen :TabContainer,
    navigationOptions: 
    { header:null 
    }
  },    // this.state = { 
    //   display: 'loginForm' 
    // };
})

const MyTab= createBottomTabNavigator({
  content: {
    screen: ApiList,
    navigationOptions: {
      tabBarLabel: "Feed",
      tabBarIcon: ({ tintColor }) => (
        <Icon name='list-alt' type='font-awesome' color={tintColor}/>
      )
    }
  },
  profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <Icon name='user' type='Entypo' color={tintColor}/>
      )
    }
  },
  settings:{
    screen: SettingPage,
    navigationOptions: {
      tabBarLabel: "Setting",
      tabBarIcon: ({ tintColor }) => (
        <Icon name='newspaper-o' type='font-awesome' color={tintColor}/>
      )
    }
  }
});

const styles = StyleSheet.create({
});
