import React from 'react';

export default class Notes extends React.Component {
    constructor(props) {
        super(props);
    }

    _onDeleteItem(id,e) {
        this.props.onDeleteItem(id);
    }
    render() {
        return(<ul className="list-group">
                {
                    this.props.list.map(function(res, index) {
                        let deleteHandle = this._onDeleteItem.bind(this,res.id);
                        return (<li className="list-group-item" key={index}>
                        {res.value} 
                        <span className="btn btn-xs btn-danger pull-right">
                            <i onClick={deleteHandle} className="glyphicon glyphicon-trash"></i>
                        </span>
                        </li>)
                    },this)
                }
            </ul>
        );
    }
} 