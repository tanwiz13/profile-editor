import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export default class InputBox extends Component{
  render() {
    return (
      
        <TextInput
         style={styles.box} 
         {...this.props}
       ></TextInput>
    );
  }
}

const styles = StyleSheet.create({
  box:{
    height:70,
    width:300,
    borderWidth:1,
    borderRadius:4,
    borderColor:'gray',
    fontSize:20,
    padding:15,
  },

});
