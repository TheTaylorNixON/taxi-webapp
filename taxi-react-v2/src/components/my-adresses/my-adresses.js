import React, { Component } from 'react'

import './my-adresses.scss'

import Backspace from '../backspace';
import AddAdress from './add-adress';
import MyAdressesList from './my-adresses-list/';

import XmlService from '../../services/xml-service';


export default class MyAdresses extends Component {

    xmlService = new XmlService();

    state = {
        showPage: false,
        data: this.props.data,
        dataToChange: null
    }

    componentWillUnmount() {
        this.props.onUnmount(this.state.data);
    }

    addAdress = () => {
        this.setState({
            showPage: true
        })
    }

    onBackspaceClick = () => {
        this.setState({
            showPage: false
        })
    }

    saveData = (newAdress) => {
        this.setState( ({ data, dataToChange }) => {

            if (dataToChange) {
                const index = data.findIndex((el) => el.idx === dataToChange.idx);
                const newData = [...data.slice(0, index), newAdress, ...data.slice(index + 1)];

                this.xmlService.post('/change-adress', newAdress);

                return {
                    showPage: false,
                    data: newData,
                    dataToChange: null
                }
            }

            console.log(data)
            newAdress.idx = data.length > 0 ? data[data.length - 1].idx + 1 : 1;

            this.xmlService.post('/save-adress', newAdress);

            return {
                showPage: false,
                data: [...data, newAdress]
            }
        })
    }

    changeData = (dataToChange) => {
        this.setState({
            showPage: true,
            dataToChange
        })
    }

    deleteData = (dataToDelete) => {
        this.setState(({ data }) => {
            const index = data.findIndex((el) => el.idx === dataToDelete.idx);
            const newData = [...data.slice(0, index), ...data.slice(index + 1)];

            this.xmlService.post('/delete-adress', dataToDelete.idx);

            return {
                data: newData,
                showPage: false,
                dataToChange: null
            }
        })
    }

    render() {

        const { showPage, dataToChange, data } = this.state;

        if (showPage) {
            return <AddAdress saveData={this.saveData} 
                              dataToChange={dataToChange} 
                              deleteData={this.deleteData}
                              onBackspaceClick={this.onBackspaceClick}
                              />
        }

        return (
            <div>
                <Backspace onBackspaceClick={this.props.onBackspaceClick} />
                <h3>Мои адреса</h3>
                <p onClick={this.addAdress}>Добавить адрес</p>
                <MyAdressesList changeData={this.changeData} data={data} />
            </div>
        )
    }
}