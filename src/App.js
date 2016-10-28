import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';
import Countries from './components/countries';
import NewOrUpdateCountry from './components/new-update-country';
import AppDispatcher from './Dispatcher';
import AppStore from './store';

export default class App extends React.Component {
	constructor() {
		super();	
		this.state = {
			location:'home',
			list: AppStore.getItems(),
			editItemId:-1
		};
		this._onChange = this._onChange.bind(this);
		this._setLocation = this._setLocation.bind(this);
		this._onEditNote = this._onEditNote.bind(this);
	}
	_setLocation(strLocation) {
		this.setState({
			location:strLocation
		})
	}
	componentDidMount() {
		AppStore.addChangeListener(this._onChange);
	}
	_onAddNote(id, countryName, countryPopulation, countryCapitol) {
		var country = {};
		country.id = id,
		country.name = countryName;
		country.population = countryPopulation;
		country.capitol = countryCapitol;
		AppDispatcher.dispatch({
			actionType : 'ITEM_ADDED',
			newItem:country
		});
	}
	_onDeleteNote(id) {
		AppDispatcher.dispatch({
			actionType:'ITEM_DELETE',
			itemId:id
		});
	}
	_onEditNote(id) {
		this.setState({
			editItemId:id
		});
		this._setLocation('editItem');
	}
	_onChange() {
        this.setState({
			list: AppStore.getItems()
		});
    }
	render () {
		// component selector
		var currentComponent;
		if(this.state.location==='home')
			currentComponent = 	<Countries 
											onDeleteItem={this._onDeleteNote} 
											onEditItem={this._onEditNote} 
											list={this.state.list}>
								</Countries>;
		else if(this.state.location==='addNewItem') //=> added a key so that React renders again 
			currentComponent = <NewOrUpdateCountry onAddItem={this._onAddNote} key="AddNew" itemId={-1}></NewOrUpdateCountry>;
		else if(this.state.location==='editItem') //=> added a key so that React renders again
			currentComponent = <NewOrUpdateCountry onAddItem={this._onAddNote} key="Edit" itemId={this.state.editItemId}></NewOrUpdateCountry>;
			
		// Returned
		return (
			<div>
				<Header setLocation={this._setLocation}></Header>
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							{currentComponent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

