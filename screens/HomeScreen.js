import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import UserList from '../components/UserList';
import axios from 'axios';
import {
	ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
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
		};
	}
	httpRequestGetAllUsers(){
		this.setState({ loading: true });
		const url = global.api+'/api/getAllUsers';
		setTimeout(() => {
			axios
				.get(url)
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
		}, 3500)
	}
  componentDidMount() {
		this.props.navigation.addListener(
			'didFocus',
			payload => {

				//this.props.navigation.setParams({user: null})
				console.debug('didFocus -- 2', payload);
				this.httpRequestGetAllUsers();
			}
		);
	}
  render() {
		if(this.state.loading){
			return (
				<View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
				);
		}else{
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
