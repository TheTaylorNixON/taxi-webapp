import React, { Component } from 'react';

import './menu-list.scss';
import '../menu-item/menu-item.scss';

// import MenuItem from '../menu-item';

export default class MenuList extends Component {


    render() {

        const arr = ['История поездок', 'Способы оплаты', 'Мои адреса', 'Промокод', 'Настройки', 'Информация', 'Служба поддержки']
        const list = arr.map((item, index) => {
            // return <MenuItem key={index} item={item} toggleMenu={this.props.toggleMenu} />

            return (
                <li className='menu-list__item' key={index} onClick={() => this.props.onItemSelected(item)}>
                    { item }
                </li>
            )
        })

        return (
            <ul className='menu-list'>
                { list }
            </ul>
        )
    }
}