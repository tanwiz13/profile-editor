import React, {Component} from 'react';
import { View,AsyncStorage,ActivityIndicator} from 'react-native';

export default class NavScreen extends Component{
    componentWillMount(){
        this.getList();
    }
    getList = async () => {
       
        try {
          const value = await AsyncStorage.getItem('token');
          if (value !== null) {
            this.props.navigation.navigate('TabScreen');
          }
          else{
            this.props.navigation.navigate('Login')
          }
         } catch (error) {
            alert('token error')
         }
      }
  render() {
    return (
     <View>
         <ActivityIndicator size='small' color='blue'></ActivityIndicator>
     </View>
    );
  }
}