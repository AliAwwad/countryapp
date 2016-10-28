import React from 'react';
import EventEmitter from '../EventEmitter';
import AppStore from '../store';

export default class NewOrUpdateCountry extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.itemId !== -1) {
            // Get country to update it later
            var country = AppStore.getItem(this.props.itemId);
            if (country !== false) {
                country = country.item;
                this.state = {
                    countryName: country.name,
                    countryPopulation: country.population,
                    countryCapitol: country.capitol
                }
            }
        }
        else {
            this.state = {
                countryName: '',
                countryPopulation: '',
                countryCapitol: ''
            }
        }
        this._onChangeItem = this._onChangeItem.bind(this);
        this._onAddItem = this._onAddItem.bind(this);
        this._enterKey = this._enterKey.bind(this);
    }
    componentDidMount() {
        document.getElementById("countryName").value = this.state.countryName;
        document.getElementById("countryPopulation").value = this.state.countryPopulation;
        document.getElementById("countryCapitol").value = this.state.countryCapitol;
    }
    _onAddItem() {
        if (document.getElementById("countryName").value == "")
            document.getElementById("countryName").focus();
        else if (document.getElementById("countryPopulation").value == "")
            document.getElementById("countryPopulation").focus();
        else if (document.getElementById("countryCapitol").value == "")
            document.getElementById("countryCapitol").focus();
        else {
            this.props.onAddItem(this.props.itemId, this.state.countryName, this.state.countryPopulation, this.state.countryCapitol);
            this.setState({
                countryName: "",
                countryPopulation: "",
                countryCapitol: "",
            });
            document.getElementById("countryName").value = "";
            document.getElementById("countryPopulation").value = "";
            document.getElementById("countryCapitol").value = "";
            document.getElementById("countryName").focus();
        }

    }
    _onChangeItem(event) {
        var thisState = event.target.id;
        this.setState({
            [thisState]: event.target.value
        });
    }
    _enterKey(e) {
        if (e.key == 'Enter') {
            if (document.getElementById("countryName").value == "")
                document.getElementById("countryName").focus();
            else if (document.getElementById("countryPopulation").value == "")
                document.getElementById("countryPopulation").focus();
            else if (document.getElementById("countryCapitol").value == "")
                document.getElementById("countryCapitol").focus();
            else if (e.target.value != "") {
                this.props.onAddItem(this.state.countryName, this.state.countryPopulation, this.state.countryCapitol);
                document.getElementById("countryName").value = "";
                document.getElementById("countryPopulation").value = "";
                document.getElementById("countryCapitol").value = "";
            }
        }
    }
    render() {
        let AddOrUpdateButton = (this.props.itemId===-1) ?  "Add" : "Update";
        return (
            <div>
                <input id="countryName" type="text" className="form-control" onKeyPress={this._enterKey}
                    placeholder="insert country name" onChange={this._onChangeItem} autoFocus /> <br />
                <input id="countryPopulation" type="number" className="form-control"
                    onKeyPress={this._enterKey} placeholder="population" onChange={this._onChangeItem} /><br />
                <input id="countryCapitol" type="text" className="form-control" onKeyPress={this._enterKey}
                    placeholder="capitol" onChange={this._onChangeItem} /><br />
                <button className="btn btn-primary btn-block" type="button" onClick={this._onAddItem}>
                    <i className="glyphicon glyphicon-download"></i> {AddOrUpdateButton} 
                        </button>
            </div>

        );
    }
}