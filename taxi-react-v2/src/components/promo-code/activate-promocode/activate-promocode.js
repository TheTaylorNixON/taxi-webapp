import React, { Component } from 'react'

import Backspace from '../../backspace';

import XmlService from '../../../services/xml-service';


export default class ActivatePromocode extends Component {

    xmlService = new XmlService();

    state = {
        promocode: ''
    }

    activatePromocode = () => {
        const { promocode } = this.state;

        this.xmlService.post('/activate-promocode', promocode, (e) => {console.log(e)});

        console.log(promocode);
    }

    onChangePromocode = (e) => {
        this.setState({
            promocode: e.target.value
        })

    }

    render() {

        const { promocode } = this.state;

        return (
            <div>
                <Backspace onBackspaceClick={this.props.onBackspaceClick}/>
                <h4>Активация промокода</h4>
                <input onChange={this.onChangePromocode} value={promocode} type="text" placeholder='Ваш промокод' />
                <button onClick={this.activatePromocode}>Активировать</button>
            </div>
        )
    }
}