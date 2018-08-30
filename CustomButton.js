import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground} from 'react-native';

export default class CustomButton extends Component{
  render() {
    return (
      <View>      
        <ImageBackground style={styles.but} source={require('./orange.png')} >
        <Text style={styles.buttonText}>{this.props.value}</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  but:{
    height:70,
    borderWidth:1,
    width:300,
    borderRadius:4,
    borderColor:'gray',
    paddingLeft:115,
    paddingTop:20,
    marginTop:20,
  },
  buttonText:{
      fontSize:20,
      color:'white'
  }

});
