import React, { Component } from 'react'

import './menu-propfile.scss';
import profileLogo from './profile-photo.png'


export default class MenuPropfile extends Component {
    render() {
        return (
            <a href='/propfile' className='menu-propfile'>
                <img src={profileLogo} alt=""/>
                <div className='menu-propfile__right'>
                    <h4>Profile Name</h4>
                    <p>+7 988 381-42-96</p>
                </div>
            </a>
        )
    }
}