import React, {Component} from 'react';
import {Platform, StyleSheet,CheckBox, TextInput, Text, View,TouchableOpacity,Image, Switch, Slider} from 'react-native';
import {Icon} from 'react-native-elements';
import InputBox from './InputBox';
import CustomButton from './CustomButton';


export default class SettingPage extends Component{
    static navigationOptions = {
        title: 'Profile',
      };
  
    state = {
        value:false,
        value1:false,
    }  

    changeVal=()=>{
        if(this.state.value){
            this.setState({value:false})
        }

        else{
            this.setState({value:true})
            this.setState({value1:false})
        }
    }
    changeVal1=()=>{
        if(this.state.value1){
            this.setState({value1:false})
        }

        else{
            this.setState({value1:true})
            this.setState({value:false})
        }
    }

  render() {
    return (
      <View style={{backgroundColor:'white'}}>
          <View style={{height:60,borderBottomWidth:1,borderBottomColor:'grey'}}>
          <View>
          <Text style={{marginLeft:10,fontSize:20}}>Setting 1</Text>
          </View>
          <View>
          <Switch 
          tintColor='grey'
          value={this.state.value}
          onValueChange={this.changeVal}>
          </Switch>
          </View>
          </View>
          <View style={{height:60,borderBottomWidth:1,borderBottomColor:'grey'}}>
          <Text style={{marginLeft:10,fontSize:20}}>Setting 2</Text>
          <Switch
          tintColor='grey'
          value={this.state.value1}
          onValueChange={this.changeVal1}>
          </Switch>
          </View>
          <View>
              <View style={{backgroundColor:'#eaeff7',height:40,borderBottomWidth:1,borderBottomColor:'grey'}}>
                  <Text style={{marginLeft:10,fontSize:20, fontWeight:'bold'}}>Notifications</Text>
              </View>
              <View style={{height:60,borderBottomWidth:1,borderBottomColor:'grey'}}>
              <View style={{flexDirection:'row'}}>
              <CheckBox style={{marginTop:8}}></CheckBox>
              <Text style={{fontSize:20,marginTop:8}}>Account info</Text>
              </View>
              </View>
              <View style={{height:60,borderBottomWidth:1,borderBottomColor:'grey'}}>
              <View style={{height:60,borderBottomWidth:1,borderBottomColor:'grey'}}>
              <View style={{flexDirection:'row'}}>
              <CheckBox style={{marginTop:8}}></CheckBox>
              <Text style={{fontSize:20,marginTop:8}}>Newsletter</Text>
              </View>
              </View>  
              </View>
          </View>
          <View>
              <View style={{backgroundColor:'#eaeff7',height:40,borderBottomWidth:1,borderBottomColor:'grey'}}>
                  <Text style={{marginLeft:10,fontSize:20, fontWeight:'bold'}}>Brightness</Text>
              </View>
              <View style={{height:60,borderBottomWidth:1,borderBottomColor:'grey'}}>
              <Slider style={{margin:20}}></Slider>
              </View>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
});
