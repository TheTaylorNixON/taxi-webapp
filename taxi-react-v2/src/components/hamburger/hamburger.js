import React, { Component } from 'react';

import './hamburger.scss'


export default class Hamburger extends Component {



    render() {

        const { toggleMenu, toggleClass } = this.props;
        const name = toggleClass ? 'stick-list active' : 'stick-list';

        return (
            <a href='/asd' className='hamburger' onClick={toggleMenu}>
                <ul className={name}>
                    <li className='stick-list__item'></li>
                    <li className='stick-list__item'></li>
                    <li className='stick-list__item'></li>
                </ul>
            </a>
        )
    }
}