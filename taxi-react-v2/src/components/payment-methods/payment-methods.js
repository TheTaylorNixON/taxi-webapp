import React, { Component } from 'react'

import './payment-methods.scss'

import AddCard from './add-card';
import Backspace from '../backspace';


export default class PaymentMethods extends Component {

    state = {
        showPage: false,
        togleClasss: false,
        paymentMethod: this.props.paymentMethod,
        allPaymentMethods: ['Наличные', 'Крта Visa', 'Карта MasterCard']
    }

    componentWillUnmount() {
        this.props.onUnmount(this.state.paymentMethod);
    }

    addCard = () => {
        this.setState({
            showPage: true
        })
    }

    onBackspaceClick = () => {
        this.setState({
            showPage: false
        })
    }

    toggleCheckbox = (el) => {
        this.setState({
            paymentMethod: el
        })
    }

    render() {

        const { showPage, paymentMethod, allPaymentMethods } = this.state;

        if (showPage) {
            return <AddCard onBackspaceClick={this.onBackspaceClick} />
        }

        return (
            <div>
                <Backspace onBackspaceClick={this.props.onBackspaceClick} />
                <h4>Способы оплаты</h4>
                <ul>
                    <ListItem paymentMethod={paymentMethod} 
                              toggleCheckbox={this.toggleCheckbox} 
                              allPaymentMethods={allPaymentMethods}/>

                    <li onClick={this.addCard}>Добавить карту</li>
                </ul>
            </div>
        )
    }
}


const ListItem = ( {paymentMethod, toggleCheckbox, allPaymentMethods} ) => {

    const listItem = allPaymentMethods.map( (el) => {

        const name = paymentMethod === el ? 'active' : null;

        return (
            <li className="checkbox" key={el}>
                <span onClick={ () => toggleCheckbox(el) }>{el}</span>
                <div  onClick={ () => toggleCheckbox(el) } className={`checkbox__flag ${name}`} />
            </li>
        )
    })

    return listItem;
}