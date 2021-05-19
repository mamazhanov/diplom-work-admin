import React, { Component } from 'react'

import firebase from '../firebase';


export default class Items extends Component {
    constructor(props) {
        super(props);

        this.firestore = firebase.firestore();
        this.products = this.firestore.collection('products');

        this.db = firebase.database();
    }

    componentDidMount() {
        this.products.get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data());
            })
        })
    }

    render() {
        return (
            <div>
                Items:
            </div>
        )
    }
}
