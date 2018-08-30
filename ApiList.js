import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, List } from 'react-native';

export default class ApiList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listData: '',
        }
    };

    getUsers = async () => {
        const { params } = this.props.navigation.state;
        try {
            let response = await fetch('http://192.168.12.39:7000/api/v1/User/getUserList/0/1/10',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': params.token
                    },
                });
            let responseJson = await response.json();
            alert(responseJson.status)
            this.setState({ listData: responseJson.message.results })
        } catch (error) {
            alert(error)
        }
    }
    componentWillMount() {
        this.getUsers();
    }

    render() {
        return (

            <FlatList
                data={this.state.listData}
                renderItem={({ item }) =>
                    <View style={styles.dataView}>
                        <Text>{item.name.first}</Text>
                        <Text>{item.email}</Text>

                    </View>
                }
            />

        );
    }
}

const styles = StyleSheet.create({
    dataView:{
        
    }
});
