import React, { Component } from 'react'

import './add-adress.scss';

import Backspace from '../../backspace';


export default class AddAdress extends Component {

    state = {
        name: '',
        adress: '',
        entrance: '',
        comment: '',
        idx: ''
    }

    componentDidMount() {
        const {dataToChange} = this.props;

        if(dataToChange) {
            this.setState({
                ...dataToChange
            })
        }
    }

    onChangeInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.saveData(this.state);
    }

    onDelete = () => {
        this.props.deleteData(this.state);
    }

    render() {

        const { name, adress, entrance, comment } = this.state;
        const { dataToChange, onBackspaceClick } = this.props;

        const deleteBtn = dataToChange ? <button type='button' onClick={this.onDelete}>Удалить</button> : null;

        return (
            <div>
                <Backspace onBackspaceClick={onBackspaceClick} />
                <form onSubmit={this.onSubmit}>
                    { deleteBtn }
                    <input onChange={this.onChangeInput} value={name} className='add-adress-input' type="text" placeholder='Название' name='name' />
                    <input onChange={this.onChangeInput} value={adress} className='add-adress-input' type="text" placeholder='Адрес' name='adress' />
                    <input onChange={this.onChangeInput} value={entrance} className='add-adress-input' type="text" placeholder='Подъезд' name='entrance' />
                    <input onChange={this.onChangeInput} value={comment} className='add-adress-input' type="text" placeholder='Подскажите водителю, как лучше к вам проехать' name='comment' />
                    <p>Начните вводите запрос. Например "Некрасова 7"</p>
                    <button className='add-adress-save-btn' type='submit' >Сохранить</button>
                </form>
            </div>
        )
    }

}