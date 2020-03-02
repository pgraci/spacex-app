import React from 'react';
import Select from 'react-select';

import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {uniqBy} from 'lodash';

const LAUNCH_YEARS_QUERY = gql`
    {
        launches(order: "desc", sort: "launch_year") {
            launch_year
        }
    }
`;

const renderOptions = options => {
    const allYearsOptions = [
        {
            value: '',
            label: 'All Years'
        }
    ];
    const launchOptions = options.map(option => ({
        value: option.launch_year,
        label: option.launch_year
    }));

    return [...allYearsOptions, ...launchOptions];
};

const SearchYear = ({handleYearSearch, searchYear}) => {
    const {loading, error, data} = useQuery(LAUNCH_YEARS_QUERY);

    if (loading) return <p className="search-year">Loading...</p>;
    if (error) return <p className="search-year">Error :(</p>;

    if (!data.launches.length) {
        return <p className="search-year">Error loading launch years</p>;
    }

    const options = uniqBy(data.launches, 'launch_year');

    return (
        <Select
            onChange={handleYearSearch}
            value={searchYear}
            options={renderOptions(options)}
            className="search-year"
        />
    );
};

export default SearchYear;
