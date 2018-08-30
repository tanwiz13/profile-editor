import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, Text, View, Image, TouchableOpacity} from 'react-native';
import InputBox from './InputBox';
import CustomButton from './CustomButton';

export default class SignIn extends Component{
    static navigationOptions = {
        title: 'Sign In',
      };

    state = {
      name:'',
      email:'',
      password:'',

    }  
  
    authenticateUser = async()  =>{
      try {
        let response = await fetch('http://192.168.12.39:7000/api/v1/user/authenticateUser', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            password:this.state.password,
          }),
        });

        let responseJson = await response.json();
        // return this.onLogin(responseJson.success);
        // return this.saveToken(responseJson.token);
        alert(responseJson.token)
        if(responseJson.success){return this.props.navigation.navigate('TabScreen',{token:responseJson.token})}
      } catch (error) {
        console.error(error);
      }
    } 
    
  onLogin=(jsonValue)=> {
  //   const { name, email, password } = this.state;
  //   var {params}=this.props.navigation.state;
  //   if (email.match(params.email)&&password.match(params.password)) 
  //  { 
    if(jsonValue){
    // this.authenticateUser();  

    this.props.navigation.navigate('TabScreen');
    }
    else {
    alert('Invalid credentials')
    }
  }   
  
  // saveToken = async(tokenValue) => {
  //   try {
  //     await AsyncStorage.setItem(':key', 'I like to save it.');
  //   }
  //   catch (error) {
  //     alert('no data stored');
  //   }
  // }

  render() {
    return (
        <View style={styles.container}>
        <View style={styles.fields}>
        <Image style={styles.logo} source={require('./icon.jpg')}></Image>
        <InputBox placeholder='E-mail' 
                  onChangeText={(email) => this.setState({ email })}>
        </InputBox>
        <InputBox placeholder='Password' 
                  secureTextEntry={true} onChangeText={(password) => this.setState({ password })}>
        </InputBox>
        <TouchableOpacity onPress={this.authenticateUser}>
        <CustomButton value='Sign In'></CustomButton>
        </TouchableOpacity>              
        <TouchableOpacity>
                    <Text style={styles.forgot} 
                          onPress={()=>alert('No Details found.')}>Forgot details?</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.lower}>
        <TouchableOpacity>
                    <Text style={styles.newAccount}
                    onPress={()=>this.props.navigation.navigate('SignUp')}>Create a new account</Text>
        </TouchableOpacity>
        </View>
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
    justifyContent:'space-between'
  },
  newAccount:{
    fontSize:18,
    color:'gray',
  },
  logo:{
      marginTop:30,
      marginLeft:70,
      borderRadius:50,
      borderWidth:1,
      marginBottom:30,
  },
  fields:{
    margin:20,
  },
  forgot:{
      fontSize:15,
      color:'black',
      marginLeft:100,
  }
});