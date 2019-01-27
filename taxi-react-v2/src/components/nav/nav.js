import React, { Component } from 'react';

import Hamburger from '../hamburger';

import './nav.scss'

export default class Nav extends Component {

    render() {
        return (
            <nav className='menu-navigation'>
                <Hamburger toggleMenu={this.props.toggleMenu} toggleClass={this.props.toggleClass} />
                <p className='nav-title'>Lite Taxi</p>
                <p className='nav-btn'>Btn</p>
            </nav>
        )
    }
}