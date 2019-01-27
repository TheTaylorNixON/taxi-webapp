import React, { Component } from 'react'

import './add-card.scss';

import Backspace from '../../backspace';

export default class AddCard extends Component {

    render() {
        return (
            <div>
                <Backspace onBackspaceClick={this.props.onBackspaceClick}/>
                <div>Форма Оплаты от Банка</div>
            </div>
        )
    }
}