import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, List, TouchableOpacity, AsyncStorage} from 'react-native';
import CustomHeader from './CustomHeader';
export default class ApiList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listData: [],
            tokenVal: '',
            page:1,
            tokenMessage:'',
        }
    };

    getUsers = async () => {
        // const { params } = this.props.navigation.state;
        try {
            let response = await fetch('http://192.168.12.39:7000/api/v1/User/getUserList/0/'+this.state.page+'/10',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': this.state.tokenVal
                    },
                });
            let responseJson = await response.json();
            // alert(responseJson.status)
            this.setState({listData:this.state.listData.concat(responseJson.message.results)})
        } catch (error) {
            alert(error)
        }
    }
    componentWillMount() {
        this.getToken();
    }

    getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          if (value !== null) {
              this.setState({tokenVal:value,page:++this.state.page})
              this.getUsers();
          }
         } catch (error) {
            alert('token error')
         }
      }

    render() {
        return (
            <View>
            <View>
                <TouchableOpacity>
                    <CustomHeader></CustomHeader>
                </TouchableOpacity>
            </View>    
            <FlatList style={styles.listStyle}
                onEndReachedThreshold={0.7}
                onEndReached={this.getToken}
                data={this.state.listData}p
                renderItem={({ item }) =>
                    <View style={styles.dataView}>
                        <Image style={{height:50,width:50,borderRadius:50,marginRight:10}} source={{uri:item.picture.large}}></Image>     
                    <View>
                        <Text style={styles.name}>{item.name.first}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                    </View>    
                    </View>
                }
            />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    listStyle:{
        padding:5,
    },
    dataView:{
        flex:1,
        flexDirection:'row',
        height:100,
        borderBottomWidth:1,
        padding:5,
        marginBottom:5, 
    },
    name:{
        fontWeight:'bold',
        fontSize:18,
    },
    email:{
        fontSize:14,
    },
});
