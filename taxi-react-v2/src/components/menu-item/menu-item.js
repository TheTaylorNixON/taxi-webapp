import React, { Component } from 'react'

import './menu-item.scss'

export default class MenuItem extends Component {

    oncf = (item) => {
        switch (item) {
            case 'История поездок':
                console.log(item);
                break;
            case 'Способы оплаты':
                console.log(item);
                break;
            case 'Мои адреса':
                console.log(item);
                break;
            case 'Промокод':
                console.log(item);
                break;
            case 'Настройки':
                console.log(item);
                break;
            case 'Информация':
                console.log(item);
                break;
            case 'Служба поддержки':
                console.log(item);
                break;
            default:
                break;
        }
        this.props.toggleMenu();
    }

    render() {

        const { item } = this.props

        return (
            <li className='menu-list__item' onClick={() => this.oncf(item)}>{ item }</li>
        )
    }
}