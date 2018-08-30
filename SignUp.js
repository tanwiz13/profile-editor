import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, Text, View, TouchableOpacity, Keyboard} from 'react-native';
import InputBox from './InputBox';
import CustomButton from './CustomButton';
import SignIn from './SignIn';

export default class SignUp extends Component{

  static navigationOptions = {
    title: 'Sign Up',
  };

  state = {
    name:'',
    email: '',
    password:'',
    };


  createUser = async()  =>{
      try {
        let response = await fetch('http://192.168.12.39:7000/api/v1/user/createUser', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password:this.state.password,
          }),
        });

        let responseJson = await response.json();
        return responseJson.data;
      } catch (error) {
        console.error(error);
      }
    }  

  submit=()=>{
    const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    const nameRegex=/^.{4,}$/;
      if (emailRegex.test(this.state.email)&&passwordRegex.test(this.state.password)&&nameRegex.test(this.state.name))
      {
        this.setState({name:this.state.name, email:this.state.email, password:this.state.password});
        alert("Welcome")
          Keyboard.dismiss();
          this.createUser();
          this.props.navigation.navigate('Login',{name:this.state.name,email:this.state.email,password:this.state.password});
      }
      else{
          alert("You have entered an invalid email address or password!")
      }
  } 

  render(){
    return (
      <View style={styles.container}>
        <InputBox placeholder='Name'
                  inputValue={this.state.name}
                  onChangeText={(name) => this.setState({ name})}>
        </InputBox>
        <InputBox placeholder='E-mail'
                  inputValue={this.state.email}
                  onChangeText={(email) => this.setState({ email })}>
        </InputBox>
        <InputBox placeholder='Password'
                  secureTextEntry={true}
                  inputValue={this.state.password}
                  onChangeText={(password) => this.setState({ password })}>
        </InputBox>
        <TouchableOpacity onPress={this.submit}>
        <CustomButton value='Sign Up'></CustomButton>
        </TouchableOpacity>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
      },
});
