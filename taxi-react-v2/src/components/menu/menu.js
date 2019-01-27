import React, { Component } from 'react';

import './menu.scss';

import MenuProfile from '../menu-propfile';
import MenuList from '../menu-list';


export default class Menu extends Component {

    
    
    render() {

        const name = this.props.toggleClass ? 'menu active' : 'menu';

        return (
            <div className={name} id='js-menu'>
                <MenuProfile />
                <MenuList onItemSelected={this.props.onItemSelected} />
            </div>
        )
    }
}