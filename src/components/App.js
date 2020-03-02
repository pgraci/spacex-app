import React from 'react';

import {ApolloProvider} from '@apollo/react-hooks';
import {debounce} from 'lodash';
import client from '../data/client';

import logo from '../assets/logo.svg';
import '../styles/styles.css';

import Launches from './Launches';
import Search from './Search';

const App = () => {
    const [rocketName, setRocketName] = React.useState('');
    const [missionName, setMissionName] = React.useState('');
    const [searchYear, setSearchYear] = React.useState({
        label: 'Select a Year',
        value: ''
    });

    const handleRocketName = debounce(value => {
        setRocketName(value);
    }, 250);

    const handleMissionName = debounce(value => {
        setMissionName(value);
    }, 250);

    const handleRocketNameSearch = e => {
        e.preventDefault();
        handleRocketName(e.target.value);
    };

    const handleMissionNameSearch = e => {
        e.preventDefault();
        handleMissionName(e.target.value);
    };

    const handleYearSearch = year => {
        setSearchYear(year);
    };

    return (
        <div className="app">
            <img src={logo} className="logo" alt="logo" />
            <h1>
                Search The SpaceX GraphQL server for upcoming and past SpaceX
                launches.
            </h1>
            <ApolloProvider client={client}>
                <Search
                    handleRocketNameSearch={handleRocketNameSearch}
                    handleMissionNameSearch={handleMissionNameSearch}
                    handleYearSearch={handleYearSearch}
                    searchYear={searchYear}
                />
                <Launches
                    rocketName={rocketName}
                    missionName={missionName}
                    launchYear={searchYear.value}
                />
            </ApolloProvider>
        </div>
    );
};

export default App;
