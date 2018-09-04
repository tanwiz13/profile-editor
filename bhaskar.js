import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity ,AsyncStorage} from 'react-native';
import LoginTextBox from '../Components/LoginTextBox';
import ImageButton from '../Components/ImageButton';
// import ImagePicker from 'react-native-image-picker';

var ImagePicker = require('react-native-image-picker');
export default class profile extends Component {
baseUrl = 'http://192.168.12.39:7000/api'

state={
avatarSource:null
}

//Logout in header
deleteUserToken = async () => {
try {
await AsyncStorage.removeItem('token');
this.props.navigation.navigate("Login")
} catch (error) {
// Error retrieving data
alert(error)
}
}
//get Token
getToken = async () => {
try {
const token = await AsyncStorage.getItem('token');
if (token !== null) {
return token;
}
} catch (error) {
alert(error)
}
}
//get email
getEmail = async () => {
try {
const email = await AsyncStorage.getItem('email');
if (email !== null) {
return email;
}
} catch (error) {
alert(error)
}
}
//Image picker function
uploadImage=()=>{
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

/**
* The first arg is the options object for customization (it can also be null or omitted for default options),
* The second arg is the callback which sends object: response (more info below in README)
*/
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

// You can also display the image using data:
let source = { uri: 'data:image/jpeg;base64,' + response.data };
this.uploadImageToServer(source);
this.setState({
avatarSource: source
});
}
});
}

uploadImageToServer=async (mySource)=>{
var mytoken=await this.getToken();
let email=await this.getEmail();
alert(mytoken)
alert(email)
alert(this.baseUrl)
try { 

let response = await fetch(this.baseUrl+'/v1/user/uploadUserImage',{
method: 'POST', 
headers: { 
// Accept: 'application/json', 
'Content-Type': 'application/json',
'x-access-token':mytoken
},
body: JSON.stringify({
email:email,
image:this.state.avatarSource.uri
}),
} );
let responseJson = await response.json();
alert("my response"+JSON.stringify(responseJson))

} catch (error) {
alert("error in image upload"+error);}


}

render() {
return (
<View style={{ flex: 1, backgroundColor: '#fff', alignitems: 'center' }}>
<View style={{ height: 80, backgroundColor: '#446A36', flexDirection: 'row', justifyContent: 'space-between' }}>
<View>
<Text style={{ fontSize: 30, fontStyle: 'sans-serif', marginTop: 10, color: '#fff' }}>
Profile
</Text>
</View>

<View>
<TouchableOpacity onPress={this.deleteUserToken}>
<Image
style={{ height: 60, borderRadius: 50, marginTop: 20, width: 40, marginRight: 20 }}
source={{ uri: 'http://chittagongit.com//images/logout-icon/logout-icon-18.jpg' }} />
</TouchableOpacity>
</View>
</View>
<Image
style={{ height: 100, width: 100, marginLeft: 140, marginTop: 20, borderRadius: 50 }}
source={ this.state.avatarSource}>
</Image>

<TouchableOpacity onPress={()=>this.uploadImage()}>
<View style={{height:80,width:80,backgroundColor:'#446A36'}}>
<Text>
Upload Image
</Text>
</View>
</TouchableOpacity>

<View style={{ margin: 20 }}>
<LoginTextBox placeholder='bhaskar'></LoginTextBox>
<LoginTextBox placeholder='joshi'></LoginTextBox>
<LoginTextBox placeholder='bhaskarj61@gmail.com'></LoginTextBox>
</View>

<View style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}>
<ImageButton value='Save'> </ImageButton>
</View>
</View>

);
}
}