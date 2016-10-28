import React from 'react';

export default class Countries extends React.Component {
    constructor(props) {
        super(props);
    }

    _onDeleteItem(id,e) {
        this.props.onDeleteItem(id);
    }
    _onEditItem(id,e) {
        this.props.onEditItem(id);
    }
    render() {
        return(<ul className="list-group">
                {
                    this.props.list.map(function(res, index) {
                        res = res.item;
                        let deleteHandle = this._onDeleteItem.bind(this,res.id);
                        let editHandle = this._onEditItem.bind(this,res.id);
                        return (<li className="list-group-item" key={index}>
                        <b>{res.name}</b>
                        <div className="btn-group btn-group-xs pull-right">
                            <button className="btn btn-default">
                                <i onClick={editHandle} className="glyphicon glyphicon-pencil"></i>
                            </button>
                            <button className="btn btn-danger">
                                <i onClick={deleteHandle} className="glyphicon glyphicon-trash"></i>
                            </button>
                        </div>
                        &nbsp;
                        <code>
                            <i className="glyphicon glyphicon-tower"></i> {res.capitol}
                            &nbsp;<i className="glyphicon glyphicon-user"></i> {res.population}
                        </code>
                        </li>)
                    },this)
                }
            </ul>
        );
    }
} 