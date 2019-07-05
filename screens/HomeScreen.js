import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import UserList from '../components/UserList';
import axios from 'axios';
import {
	ActivityIndicator,
	StyleSheet,
	View
} from 'react-native';
import deviceStorage from '../constants/deviceStorage';
export default class HomeScreen extends React.Component {

	static navigationOptions = {
		title: 'Usuários',
	};
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: false,
			error: false,
			jwt: ''
		};
		console.log("Entrou no construtor");
		deviceStorage
			.loadJWT()
			.then(token => {
				console.log('-------------<3>--------------')
				console.log(token)
				//this.state.jwt = token;
				this.newJWT(token);
				console.log('-------------<4>--------------')
				console.log(this.state.jwt)
				console.log('-------------<5>--------------')

			});
	}


	newJWT(jwt) {
		this.setState({
			jwt: jwt
		});
	}
	httpRequestGetAllUsers() {
		this.setState({ loading: true });
		const headers = {
			'Authorization': 'Bearer ' + this.state.jwt
		};
		console.log(headers)
		const url = global.api + '/api/getAllUsers';
		setTimeout(() => {
			axios({
				method: 'GET',
				url: url,
				headers: headers,
			}).then((response) => {
				console.log(response.data)        
				this.setState({
					users: response.data,
					loading: false,
				});
			}).catch((error) => {
				this.setState({
					loading: false,
					error: true,
				})
			})
		}, 4000);
		/*
		const url = global.api+'/api/getAllUsers';
		const headers = {
			'Authorization': 'Bearer ' + this.state.jwt
		  };
		console.log(headers)
		setTimeout(() => {
			axios
				.get(url,headers)
				.then(response => {
          //console.log(response.data)        
					this.setState({
						users: response.data,
						loading: false,
          });
          //console.log(this.state.users)
				}).catch(error => {
					this.setState({
						loading: false,
						error: true,
					})
				});
		}, 3500)*/
	}
	componentDidMount() {
		this.props.navigation.addListener(
			'didFocus',
			payload => {

				//this.props.navigation.setParams({user: null})
				//console.debug('didFocus -- 2', payload);
				this.httpRequestGetAllUsers();
			}
		);
	}
	render() {
		if (this.state.loading) {
			return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		} else {
			return (
				<View>
					<UserList
						users={this.state.users}
						onPressItem={pageParams => {
							console.log(pageParams)
							this.props.navigation.navigate('Edit', pageParams);
						}} />
				</View>
			);
		}
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	}
})
