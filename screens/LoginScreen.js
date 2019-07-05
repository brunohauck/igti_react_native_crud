import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { StackActions, NavigationActions } from 'react-navigation';
import { Content, Form, Item, Input, Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';
import deviceStorage from '../constants/deviceStorage';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'brunohauck',
            password: '123456'
        }
    }
    
    validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (password == "") {
            return false
        } else {
            return regex.test(password);
        }
    }
    formSubmit = () => {
        const vm = this;
         if (this.state.username == "") {
            alert('Please enter contact name!')
        } 
        console.log("entrou no post login")
        if (this.state.username == "") {
            alert('Please enter contact name!')
        } else {
            const url = global.api + '/api/auth';
            axios.post(url, vm.state)
                .then((response) => {
                    const data = response.data;          
                    console.log(data.token);
                    deviceStorage.saveKey("id_token", data.token);
                    this.props.navigation.navigate('HomeStack');
                })
                .catch(function (err) {
                    alert(err)
                })
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <Content>
                    <Form style={styles.formOuter}>
                        <Item floatingLabel style={styles.formInput}>
                            <Label>Username</Label>
                            <Input
                                onChangeText={(username) => this.setState({ username })}
                                value={this.state.username}
                            />
                        </Item>
                        <Item floatingLabel style={styles.formInput}>
                            <Label>Password</Label>
                            <Input
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                            />
                        </Item>
                        <Button block primary iconLeft style={styles.submitBtn} onPress={this.formSubmit.bind(this)}>
                            <Text>Log in</Text>
                        </Button>
                    </Form>
                </Content>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    formOuter: {
        flex: 1,
        padding: 8
    },
    formInput: {
        marginLeft: 0
    },
    submitBtn: {
        marginTop: 20
    }
});
