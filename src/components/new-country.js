import React from 'react';
import EventEmitter from '../EventEmitter';

export default class NewNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteStr:''
        }
        this._onChangeItem = this._onChangeItem.bind(this);
        this._onAddItem = this._onAddItem.bind(this);
        this._enterKey = this._enterKey.bind(this);
    }
    _onAddItem() {
        if(document.getElementById("main-input").value!="")
        {
            this.props.onAddItem(this.state.noteStr);
            this.setState({noteStr:""});
            document.getElementById("main-input").value="";
            document.getElementById("main-input").focus();
        }
        
    }
    _onChangeItem(event) {
        this.setState({
            noteStr:event.target.value
        });
    }
    _enterKey(e) {
        if(e.key=='Enter') {
            if(e.target.value!="")
            {
                this.props.onAddItem(this.state.noteStr);
                this.setState({noteStr:""});
                e.target.value="";
            }
        }
    }
	render() {
		return(
                <div className="input-group">
                    <input id="main-input" type="text" className="form-control" onKeyPress={this._enterKey} autoFocus 
                    placeholder="insert your note..." onChange={this._onChangeItem} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={ this._onAddItem }>
                            <i className="glyphicon glyphicon-download"></i> Add
                        </button>
                    </span>
                </div>
		);
	}
}