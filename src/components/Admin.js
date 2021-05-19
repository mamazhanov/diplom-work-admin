import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';

export default class Admin extends Component {
    state = {
        loading: false,
        name: null,
        availableSizes: null,
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

    add = async () => {
        this.setState({ loading: true });
        try {
            const item = await this.products.add({
                _id: uuidv4(),
                title: this.state.name,
                description: {
                    diagonal: this.state.diagonal,
                    gpu: this.state.gpu,
                    os: this.state.gpu,
                    cpu: this.state.cpu,
                    CPU_frequency: this.state.cpu_frequency,
                    ram: this.state.ram,
                    memoryType: this.state.memory_type,
                    memory: this.state.memory
                },
                availableSizes: this.state.availableSizes,
                price: +this.state.price
            });

            if (this.state.file) await this.storage_ref.child(`products/${item.id}${this.state.file.name}`).put(this.state.file);

            await this.products.doc(item.id).update({
                image_ref: `products/${item.id}${this.state.file.name}`,
                image: await this.storage_ref.child(`products/${item.id}${this.state.file.name}`).getDownloadURL(),
            });

            alert('ok!');
        } catch (e) {
            alert('error!');
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div className="admin">

                { this.state.loading ? "Подождите пожалуйста..." : <div className="form">
                    <div>
                        <label>Название ноутбука:</label>
                        <input type="text" onChange={(e) => this.setState({ name: e.target.value })} name="name" placeholder="Ноутбук Acer Acpire" />
                    </div>
                    <div>
                        <label>Модель ноутбука:</label>
                        <input type="text" onChange={(e) => this.setState({ availableSizes: e.target.value })} name="model" placeholder="Acer" />
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
                        <input type="number" onChange={(e) => this.setState({ price: e.target.value })} name="price" />
                    </div>
                    <div>
                        <label>Фото:</label>
                        <input type="file" onChange={(e) => this.setState({ file: e.target.files[0] })} name="image" />
                    </div>
                    <div>
                        <button disabled={!this.state.file} onClick={() => this.add()}>Добавить</button>
                    </div>
                </div>}

            </div>
        )
    }
}
