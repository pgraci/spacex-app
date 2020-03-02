import React from 'react';
import Select from 'react-select';

const SearchYear = ({handleYearSearch, searchYear}) => {
    const options = [
        {
            value: '',
            label: 'All Years'
        },
        {
            value: '2020',
            label: '2020'
        },
        {
            value: '2019',
            label: '2019'
        },
        {
            value: '2018',
            label: '2018'
        },
        {
            value: '2017',
            label: '2017'
        },
        {
            value: '2016',
            label: '2016'
        },
        {
            value: '2015',
            label: '2015'
        },
        {
            value: '2014',
            label: '2014'
        },
        {
            value: '2013',
            label: '2013'
        },
        {
            value: '2012',
            label: '2012'
        },
        {
            value: '2011',
            label: '2011'
        },
        {
            value: '2010',
            label: '2010'
        },
        {
            value: '2009',
            label: '2009'
        },
        {
            value: '2008',
            label: '2008'
        },
        {
            value: '2007',
            label: '2007'
        },
        {
            value: '2006',
            label: '2006'
        }
    ];

    const renderOptions = options.map(option => (
        <option key={option.value} value={option.value}>
            {option.displayValue}
        </option>
    ));

    return (
        <Select
            onChange={handleYearSearch}
            value={searchYear}
            options={options}
            className="search-year"
        >
            {renderOptions}
        </Select>
    );
};

export default SearchYear;
