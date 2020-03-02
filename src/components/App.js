import React from 'react';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

import logo from '../assets/logo.svg';
import '../styles/styles.css';

import LaunchList from './LaunchList';

const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/'
});

function App() {
    return (
        <div className="app">
            <img src={logo} className="logo" alt="logo" />
            <h1>
                Search The SpaceX GraphQL server for upcoming and past SpaceX
                launches.
            </h1>

            <ApolloProvider client={client}>
                <div>
                    <LaunchList />
                </div>
            </ApolloProvider>
        </div>
    );
}

export default App;
