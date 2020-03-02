import React from 'react';
import Select from 'react-select';

import {useQuery} from '@apollo/react-hooks';
import {uniqBy} from 'lodash';

import {LAUNCH_YEARS_QUERY} from '../data/queries';

type OptionType = {label: string; value: string};

interface Props {
    handleYearSearch: any;
    searchYear: OptionType;
}

interface LaunchYears {
    launch_year: string;
}

const renderOptions = (options: LaunchYears[]) => {
    const allYearsOptions = [
        {
            value: '',
            label: 'All Years'
        }
    ];
    const launchOptions = options.map((option: LaunchYears) => ({
        value: option.launch_year,
        label: option.launch_year
    }));

    return [...allYearsOptions, ...launchOptions];
};

const SearchYear = ({handleYearSearch, searchYear}: Props) => {
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
            options={renderOptions(options as any)}
            className="search-year"
        />
    );
};

export default SearchYear;
