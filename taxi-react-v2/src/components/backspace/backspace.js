import React, { Component } from 'react';

import './backspace.scss';


export default  class Backspace extends Component {

    onBackspaceClick = () => {
        this.props.onBackspaceClick();
    }

    render() {

        return (
            <button className='backspace-btn' onClick={this.onBackspaceClick}>Backspace</button>
        )
    }
}