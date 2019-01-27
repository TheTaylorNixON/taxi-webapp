import React, { Component } from 'react'

import './promo-code.scss'

import Backspace from '../backspace';
import ActivatePromocode from './activate-promocode';
import SharePromocode from './share-promocode';


export default class PromoCode extends Component {

    state = {
        activatePromocode: false,
        sharePromocode: false
    }

    showPage = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: true
        })
    }

    onBackspaceClick = () => {
        this.setState({
            activatePromocode: false,
            sharePromocode: false
        })
    }

    render() {

        const { activatePromocode, sharePromocode } = this.state;

        if (activatePromocode) {
            return <ActivatePromocode onBackspaceClick={this.onBackspaceClick} />;
        } else if (sharePromocode) {
            return <SharePromocode onBackspaceClick={this.onBackspaceClick} />;
        }

        return (
            <div>
                <Backspace onBackspaceClick={this.props.onBackspaceClick}/>
                <h4>Промокод</h4>
                <div>
                    <a href="/activate-promocode" name='activatePromocode' onClick={this.showPage}>Активировать поромокод</a>
                </div>
                <div>
                    <a href="/share-promocode" name='sharePromocode'onClick={this.showPage}>Поделиться промокодом</a>
                </div>
            </div>
        )
    }
}