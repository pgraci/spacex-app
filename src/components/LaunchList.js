import React from 'react';

import {useQuery} from '@apollo/react-hooks';

import {uniqBy} from 'lodash';
import {formatDate} from '../utils/date_helpers';
import {LAUNCHES_QUERY} from '../data/queries';

import Loader from './Loader';

const renderVideoLink = url => {
    if (!url) return;
    return (
        <p className="launch-details">
            <a href={url} target="youtube">
                {url}
            </a>
        </p>
    );
};

const renderLaunches = launches =>
    launches.map(({id, launch_date_local, links, mission_name, rocket}) => (
        <div key={id} className="launch-wrapper">
            <p className="launch-date">{formatDate(launch_date_local)}</p>
            <p className="launch-mission">MISSION: {mission_name}</p>
            <p className="launch-rocket">ROCKET: {rocket.rocket_name}</p>
            {renderVideoLink(links.video_link)}
        </div>
    ));

const LaunchList = ({rocketName, missionName, launchYear}) => {
    const {loading, error, data} = useQuery(LAUNCHES_QUERY, {
        variables: {rocketName, missionName, launchYear}
    });

    if (loading) return <Loader />;
    if (error) return <p>Error :(</p>;

    if (!data.launches.length) {
        return <p className="launch-mission">No matching launches found.</p>;
    }

    // SpaceX GQL server returns duplicate data at times
    const launches = uniqBy(data.launches, 'id');

    return renderLaunches(launches);
};

export default LaunchList;
