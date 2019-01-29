import React, { Component } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Container, Content, Header, Input, List, ListItem, Button, Icon, Body, Text } from 'native-base';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';


import SERVER_ORIGIN from './config';


export default class ContentSection extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	contactList: [],
	  	page: 2,
	  	loading: false,
		refreshing: false,
		search: '',
	  };
	}

	componentDidMount() {
		this.getData();
	};

	getData = () => {
		const vm = this;

		this.setState({
			loading:true
		});

		axios.get(`${SERVER_ORIGIN}/api/v1/contacts`)
		.then(function(response) {
			vm.setState({
				page: 2,
				loading: false,
				refreshing: false,
				contactList: response.data,
			});
		})
		.catch(function(err) {
			alert(err);
		});
	};

	search = (searchString) => {
		const vm = this;

		this.setState({
			loading:true
		});

		axios.get(`${SERVER_ORIGIN}/api/v1/contacts/${searchString}`)
		.then(function(response) {
			vm.setState({
				page: 2,
				loading: false,
				refreshing: false,
				contactList: response.data,
			});
		})
		.catch(function(err) {
			alert(err);
		});
	};

	deleteContact = (id) => {
		var vm = this;

		axios.delete(`${SERVER_ORIGIN}/api/v1/contacts/delete/${id}`)
		.then(function(response) {
			const data = response;

			alert(data.msg);
			vm.getData();
		})
		.catch(function(err) {
			alert(err)
		})
	};

	showAlert = (id, name) => {
		const vm = this;

		Alert.alert(
			'Confirmation de la supprission',
			'êtes-vous sûr de vouloir supprimer "'+name+'" de votre contact?',
			[
				{text: 'Annuler', onPress: () => console.log('Annulé'), style: 'annuler'},
				{text: 'Supprimer', onPress: () => this.deleteContact(id)},
			]
		)
	};

	renderFooter = () => {
		if (!this.state.loading) return null;

		return (
			<View
			style={{
				flex:1,
				paddingVertical: 20,
				justifyContent: 'center',
				position: 'absolute'
			}}>
				<ActivityIndicator animating size="large" />
			</View>
		)
	};

	dataRefresh = () => {
		this.setState({
			refreshing: true
		},
		() => {
			this.getData();
		}
		)
	}

	loadMore = () => {
		const vm = this;

		this.setState({
			loading: true
		}, () => {
			axios.get(`${SERVER_ORIGIN}/api/v1/contacts/page/${this.state.page}`)
			.then(function(response) {
				const newList = vm.state.contactList.concat(response.data);
				const newPage = vm.state.page + 1;
				vm.setState({
					contactList: newList,
					page: newPage,
					loading: false
				})
			})
			.catch(function(err) {
				alert(err)
			})
		});
	};

	render() {
		if (this.state.contactList.length == 0) {
			return(
				<Content style={styles.contentWrapper}>
					<View style={{justifyContent:'center', alignItems:'center', paddingTop:250}}>
						<Text style={styles.emptyText}>Chargement en cours</Text>
					</View>
				</Content>
			)
		} else {
			return (
				<Container>
					<Header searchBar rounded>
						<Item>
							<Icon name="search" />
							<Input placeholder="Rechercher" onChangeText={(search) => this.setState({search})} />
						</Item>
						<Button transparent onPress={this.search.bind(this)}>
							<Text>Search</Text>
						</Button>
					</Header>
					<List style={{flex:1}}>
						<FlatList
							data={this.state.contactList}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<ListItem style={styles.listItem}>
									<TouchableOpacity
									onPress={() => this.props.navigation.navigate('EditContact', item)}
									onLongPress={() => this.showAlert(item.id, item.name)}
									activeOpacity={0.5}>
										<Body>
											<Text>{item.name}</Text>
											<Text>{item.email}</Text>
											<Text note numberOfLines={1}>{item.phone}</Text>
										</Body>
									</TouchableOpacity>
								</ListItem>
							)}
							ListFooterComponent={this.renderFooter}
							onRefresh={this.dataRefresh}
							refreshing={this.state.refreshing}
							onEndReached={this.loadMore}
							onEndReachedThreshold={0.1}
						/>
					</List>
				</Container>
			)
		}
	}
}

const styles = StyleSheet.create({
	contentWrapper: {
		padding: 10
	},
	emptyText: {
		fontSize: 15,
		color: '#424242'
	},
	listItem: {
		marginLeft: 0
	}
});