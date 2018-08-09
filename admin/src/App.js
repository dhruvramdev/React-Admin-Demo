// in App.js
import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import buildGraphQLProvider from 'ra-data-graphql';
import {Admin, Resource, Delete} from 'react-admin';

import queryBuilder from './queryBuilder' ;
import {ProductCreate, ProductEdit, ProductList} from "./products";
import {BookList} from "./books";

// console.log(queryBuilder());

const client = new ApolloClient({
    uri: "http://localhost:4000/"
});

class App extends Component {
    constructor() {
        super();
        this.state = {dataProvider: null};
    }

    componentDidMount() {
        buildGraphQLProvider({
            client,
            buildQuery: queryBuilder
        }).then(dataProvider => this.setState({dataProvider}));
    }

    render() {
        const {dataProvider} = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }

        return (
            <Admin dataProvider={dataProvider}>
                <Resource name="Product" list={ProductList} edit={ProductEdit} create={ProductCreate}/>
                <Resource name="Seller" list={BookList}/>
            </Admin>
        );
    }
}

export default App;