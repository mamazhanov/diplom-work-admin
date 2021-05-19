import React, { Component } from 'react'

import firebase from '../firebase';

export default class My_Admin extends Component {
    state = {
        loading: false,
        name: null,
        model: null,
        diagonal: null,
        gpu: null,
        os: null,
        cpu: null,
        cpu_frequency: null,
        ram: null,
        memory_type: null,
        memory: null,
        file: null,
        price: null
    }

    constructor(props) {
        super(props);

        this.firestore = firebase.firestore();

        this.products = this.firestore.collection('products');
        this.storage = firebase.storage();
        this.storage_ref = this.storage.ref();
    }

    add = () => {
        const item = {
            name: this.state.name,
            model: this.state.model,
            diagonal: this.state.diagonal,
            gpu: this.state.gpu,
            os: this.state.os,
            cpu: this.state.cpu,
            cpu_frequency: this.state.cpu_frequency,
            ram: this.state.ram,
            memory_type: this.state.memory_type,
            memory: this.state.memory,
            price: this.state.price
        };

        this.products.add({ item }).then(() => alert("Document successfully written!")).catch((error) => alert("Error writing document: ", error))

    }

    render() {
        return (
            <div className="admin">

                { this.state.loading ? "Подождите пожалуйста..." : <div>
                    <div>
                        <label>Название ноутбука:</label>
                        <input type="text" onChange={(e) => this.setState({ name: e.target.value })} name="name" />
                    </div>
                    <div>
                        <label>Модель ноутбука:</label>
                        <input type="text" onChange={(e) => this.setState({ model: e.target.value })} name="model" />
                    </div>
                    <div>
                        <label>Диагональ:</label>
                        <input type="text" onChange={(e) => this.setState({ diagonal: e.target.value })} name="diagonal" />
                    </div>
                    <div>
                        <label>Видеоадаптер:</label>
                        <input type="text" onChange={(e) => this.setState({ gpu: e.target.value })} name="gpu" />
                    </div>
                    <div>
                        <label>Операционная система:</label>
                        <input type="text" onChange={(e) => this.setState({ os: e.target.value })} name="os" />
                    </div>
                    <div>
                        <label>Модель процессора:</label>
                        <input type="text" onChange={(e) => this.setState({ cpu: e.target.value })} name="cpu" />
                    </div>
                    <div>
                        <label>Частота процессора:</label>
                        <input type="text" onChange={(e) => this.setState({ cpu_frequency: e.target.value })} name="cpu_frequency" />
                    </div>
                    <div>
                        <label>Объем оперативной памяти:</label>
                        <input type="text" onChange={(e) => this.setState({ ram: e.target.value })} name="ram" />
                    </div>
                    <div>
                        <label>Тип жесткого диска:</label>
                        <input type="text" onChange={(e) => this.setState({ memory_type: e.target.value })} name="memory_type" />
                    </div>
                    <div>
                        <label>Объем накопителя:</label>
                        <input type="text" onChange={(e) => this.setState({ memory: e.target.value })} name="memory" />
                    </div>
                    <div>
                        <label>Цена:</label>
                        <input type="text" onChange={(e) => this.setState({ price: e.target.value })} name="price" />
                    </div>
                    <div>
                        <label>Фото:</label>
                        <input type="file" onChange={(e) => this.setState({ file: e.target.files[0] })} name="image" />
                    </div>
                    <div>
                        <input onClick={() => this.add()} type="submit" value="send" />
                    </div>
                </div>}

            </div>
        )
    }
}
