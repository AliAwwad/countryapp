import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';
import Countries from './components/countries';
import NewCountry from './components/new-country';
import AppDispatcher from './Dispatcher';
import AppStore from './store';

export default class App extends React.Component {
	constructor() {
		super();	
		this.state = {
			location:'home',
			list: AppStore.getItems()
		};
		this._onChange = this._onChange.bind(this);
		this._setLocation = this._setLocation.bind(this);
	}
	_setLocation(strLocation) {
		this.setState({
			location:strLocation
		})
	}
	componentDidMount() {
		AppStore.addChangeListener(this._onChange);
	}
	_onAddNote(countryName, countryPopulation, countryCapitol) {
		var country = {};
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
	_onChange() {
        this.setState({
			list: AppStore.getItems()
		});
    }
	render () {
		
		// component selector
		var currentComponent;
		console.log(this.state);
		if(this.state.location==='home')
			currentComponent = <Countries onDeleteItem={this._onDeleteNote} list={this.state.list}></Countries>;
		else if(this.state.location==='addNewItem')
			currentComponent = <NewCountry onAddItem={this._onAddNote}></NewCountry>;
		
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

