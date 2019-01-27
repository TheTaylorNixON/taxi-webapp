import React, { Component } from 'react';

import Nav from '../nav';
import Menu from '../menu';

import RideHistrory from '../ride-history';
import PaymentMethods from '../payment-methods';
import MyAdresses from '../my-adresses';
import PromoCode from '../promo-code';
import Settings from '../settings';
import Information from '../information';
import Support from '../support/';
import MainPage from '../main-page';

import XmlService from '../../services/xml-service';


export default class App extends Component {

    xmlService = new XmlService();

    state = {
        active: false,
        itemSelected: null,
        //
        adressesData: [],
        paymentMethod: null,
    }

    componentDidMount() {
        this.xmlService.get('/get-main-data');

        this.xmlService.get('/get-adresses', (adressesData) => {
            this.setState({
                adressesData
            })
        });
    }

    toggleMenu = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.setState(( {active} ) => {
            return {
                active: !active
            }
        })
    }

    onItemSelected = (item) => {
        this.setState({
            itemSelected: this.filterItem(item)
        })

        this.toggleMenu();
    }

    onBackspaceClick = () => {
        this.setState({
            itemSelected: false
        })
    }

    filterItem = (item) => {
        switch (item) {
            case 'История поездок':
                return <RideHistrory />;
            case 'Способы оплаты':
                return <PaymentMethods paymentMethod={this.state.paymentMethod}
                                       onUnmount={ (paymentMethod) => this.setState({paymentMethod}) }
                                       onBackspaceClick={this.onBackspaceClick}
                        />
            case 'Мои адреса':
                return <MyAdresses data={this.state.adressesData} 
                                   onUnmount={ (adressesData) => this.setState({adressesData})}
                                   onBackspaceClick={this.onBackspaceClick}
                        />
            case 'Промокод':
                return <PromoCode 
                            onBackspaceClick={this.onBackspaceClick}
                        />
            case 'Настройки':
                return <Settings />
            case 'Информация':
                return <Information />
            case 'Служба поддержки':
                return <Support />
            default:
                return null;
        }
    }


    render() {

        const { active, itemSelected } = this.state;
        const content = itemSelected ? itemSelected : <MainPage />;

        return (
            <section className='item-main-section'>
                <Nav  toggleMenu={this.toggleMenu} toggleClass={active} />
                <Menu toggleMenu={this.toggleMenu} toggleClass={active} onItemSelected={this.onItemSelected} />
                { content }
            </section>
        )
    }
}