import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, Text, View,TouchableOpacity,Image, ImageBackground, AsyncStorage} from 'react-native';
import InputBox from './InputBox';
import CustomButton from './CustomButton';

var ImagePicker = require('react-native-image-picker');

export default class Profile extends Component{
    baseUrl = 'http://192.168.12.39:7000/api'
    static navigationOptions = {
        title: 'Profile',
      };

      state = {
        avatarSource:'',
      }

      getToken = async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              if (token !== null) {
              return token;
              }
            } 
            catch (error) {
            alert(error)
            }
        }

        getEmail = async () => {
            try {
              const email = await AsyncStorage.getItem('email');  
              if (email !== null) {
              return email;
              }
            } 
            catch (error) {
              alert(error)
            }
        }
      imageUpload = () =>{

          var options = {
            title: 'Select Avatar',
            customButtons: [
              {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };

          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              // let source = { uri: response.uri };
              let source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.uploadImageToServer(source);

              this.setState({
                avatarSource: source
              });
            }
          });
      }

      uploadImageToServer=async (mySource)=>{
          var tokenVal=await this.getToken();
          let email=await this.getEmail();
          alert(tokenVal)
          alert(email)
          alert(this.baseUrl)
          try { 
          
          let response = await fetch(this.baseUrl+'/v1/user/uploadUserImage',{
          method: 'POST', 
          headers: { 
          'Content-Type': 'application/json',
          'x-access-token':tokenVal
          },
          body: JSON.stringify({
          email:email,
          image:this.state.avatarSource.uri
          }),
          } );
          let responseJson = await response.json();
          alert("my response"+JSON.stringify(responseJson))
          
          }
          catch (error) {
          alert("error in image upload"+error);
          }
        }

  render() {
    return (
      <View style={styles.container}>
        {/* <ImageBackground style={styles.logo} source={ this.state.avatarSource}></ImageBackground>      */}
        <Image
          style={{ height: 100, width: 100, margin: 50, borderRadius: 50 }}
          source={ this.state.avatarSource}>
        </Image>

        <TouchableOpacity onPress={()=>this.imageUpload()}>
        <View style={{height:30,width:80,backgroundColor:'white'}}>
          <Text>
            Upload
          </Text>
        </View>
            </TouchableOpacity>
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
