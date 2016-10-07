import React from 'react';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this._setLocationToHome = this._setLocationToHome.bind(this);
		this._setLocationToNew = this._setLocationToNew.bind(this);	
	}

	_setLocationToNew() {
		this.props.setLocation('addNewItem');
	}

	_setLocationToHome() {
		this.props.setLocation('home');
	}

	render() {
		
		return(
			<div id="header" style={{marginBottom:'10px'}}>
				<nav className="navbar navbar-default">
					<div className="container"> 
						<div className="navbar-header"> 
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="true">
								<span className="sr-only">Toggle navigation</span> 
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button> <a href="#" className="navbar-brand">Country App</a>
						</div>
					</div>
				</nav>
				<div className="row">
					<div className="col-sm-12">
						<div className="btn-group col-xs-12">
							<button className="btn btn-default col-xs-6" onClick={this._setLocationToNew}>
								<i className="glyphicon glyphicon-save"></i> Add New Country
							</button>
							<button className="btn btn-default col-xs-6" onClick={this._setLocationToHome}>
								<i className="glyphicon glyphicon-refresh"></i> View All
							</button>
						</div>
					</div>
				</div>
			</div>);
	}
}