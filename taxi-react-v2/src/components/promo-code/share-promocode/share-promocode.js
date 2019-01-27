import React, { Component } from 'react'

import Backspace from '../../backspace';


export default class SharePromocode extends Component {


    render() {
        return (
            <div>
                <Backspace onBackspaceClick={this.props.onBackspaceClick} />
                <span>Поделиться промокодом</span>
            </div>
        )
    }
}