import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, Text, View,TouchableOpacity,Image} from 'react-native';
import InputBox from './InputBox';
import CustomButton from './CustomButton';

export default class SignUp extends Component{
    static navigationOptions = {
        title: 'Profile',
      };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./icon.jpg')}></Image>     
        <InputBox placeholder='Name'>Tanvir</InputBox>
        <InputBox placeholder='E-mail'>tanvir@gmail.com</InputBox>
        <InputBox placeholder='Phone Number'>9999999999</InputBox>
        <TouchableOpacity>
        <CustomButton style={styles.saveButton} value='Save'></CustomButton>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    saveButton:{
        marginTop:40,
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
      },
      logo:{
        margin:50,
        borderRadius:50,
    }  
});
