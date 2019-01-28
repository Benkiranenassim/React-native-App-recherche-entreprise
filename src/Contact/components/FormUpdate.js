import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';

import SERVER_ORIGIN from './config';

// const SERVER_ORIGIN = 'http://58e91448.ngrok.io';
export default class FormUpdate extends Component {
	constructor(props) {
		super(props);

		const { id, name, email, phone } = props.data;
		this.state = {
			id: id,
			name: name,
			email: email,
			phone: phone
		}
	}

	validateEmail = (email) => {
		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email == "") {
			return false
		} else {
			return regex.test(String(email).toLowerCase());
		}
	}

	validatePhone = (phone) => {
		const regex = /^\+?[0-9]*$/;
		
		if (phone == "") {
			return false
		} else {
			return regex.test(phone);
		}
	}

	deleteContact = () => {
		var vm = this;

		const id = vm.state.id;

		axios.delete(`${SERVER_ORIGIN}/api/v1/contacts/delete/${id}`)
		.then(function(response) {
			alert('Supprimé avec succès');

			vm.props.navigation.dispatch(
				vm.props.navigation.goBack()
			)
		})
		.catch(function(err) {
			alert(err)
		})
	};

	formSubmit = () => {
		const vm = this;

		if (this.state.name == "") {
			alert('Sil vous plaît entrer le nom du contact!')
		} else if (this.validateEmail(this.state.email) == false) {
			alert('Sil vous plaît entrer un email valide!')
		} else if (this.validatePhone(this.state.phone) == false) {
			alert('Sil vous plaît entrer un numéro de téléphone valide!')
		} else {
			axios.patch(`${SERVER_ORIGIN}/api/v1/contacts/edit`, vm.state)
			.then(function(response) {
				alert('Bien enregistrée');

				vm.props.navigation.dispatch(
					vm.props.navigation.goBack()
				)
			})
			.catch(function(err) {
				alert(err)
			})
		}
	}

	render() {
		return (
			<Content>
				<Form style={styles.formOuter}>
					<Item floatingLabel style={styles.formInput}>
						<Label>Nom et prénom</Label>
						<Input
						onChangeText={(name) => this.setState({name})}
						value={this.state.name}
						/>
					</Item>
					<Item floatingLabel style={styles.formInput}>
						<Label>E-mail</Label>
						<Input
						onChangeText={(email) => this.setState({email})}
						value={this.state.email}
						/>
					</Item>
					<Item floatingLabel style={styles.formInput}>
						<Label>Téléphone</Label>
						<Input
						onChangeText={(phone) => this.setState({phone})}
						value={this.state.phone}
						/>
					</Item>
					<Button block primary iconLeft style={styles.submitBtn} onPress={this.formSubmit.bind(this)}>
						<Icon name='checkmark-circle' />
						<Text>Modifier</Text>
					</Button>
				</Form>
				<Button block primary iconLeft style={styles.submitBtn} onPress={this.deleteContact.bind(this)}>
					<Icon name='trash' />
					<Text>Supprimer</Text>
				</Button>
			</Content>
		)
	}
}

const styles = StyleSheet.create({
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