import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground} from 'react-native';

export default class CustomHeader extends Component{
  render() {
    return (
      <View style={styles.headStyle}>      
      <Text style={{fontSize:25,color:'#fff', alignSelf:'center'}}>Feed</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headStyle:{
    height:50,
    borderWidth:1,
    borderColor:'grey',
    paddingTop:10,
    backgroundColor:'blue',
  },
});
