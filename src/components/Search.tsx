import React from 'react';

import SearchYear from './SearchYear';

type OptionType = {label: string; value: string};

interface Props {
    handleRocketNameSearch: any;
    handleMissionNameSearch: any;
    handleYearSearch: any;
    searchYear: OptionType;
}

const Search = ({
    handleRocketNameSearch,
    handleMissionNameSearch,
    handleYearSearch,
    searchYear
}: Props) => (
    <div className="search">
        <input
            type="text"
            className="search-input"
            placeholder="Enter a Rocket name"
            onChange={handleRocketNameSearch}
        />
        <input
            type="text"
            className="search-input"
            placeholder="Enter a Mission name"
            onChange={handleMissionNameSearch}
        />
        <SearchYear
            handleYearSearch={handleYearSearch}
            searchYear={searchYear}
        />
    </div>
);

export default Search;
