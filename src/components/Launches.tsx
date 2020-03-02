import React from 'react';

import {useQuery} from '@apollo/react-hooks';

import {uniqBy} from 'lodash';
import {formatDate} from '../utils/date_helpers';
import {LAUNCHES_QUERY} from '../data/queries';

import Loader from './Loader';

interface Props {
    rocketName: string;
    missionName: string;
    launchYear: string;
}

interface Launch {
    id: string;
    launch_date_local: string;
    links: {
        video_link: string;
    }
    mission_name: string;
    rocket: {
        rocket_name: string;
    };
}

const renderVideoLink = (url: string) => {
    if (!url) return;
    return (
        <p className="launch-details">
            <a href={url} target="youtube">
                {url}
            </a>
        </p>
    );
};

const renderLaunchList = (launches: any) =>
    launches.map(({id, launch_date_local, links, mission_name, rocket}: Launch) => (
        <div key={id} className="launch-wrapper">
            <p className="launch-date">{formatDate(launch_date_local)}</p>
            <p className="launch-mission">MISSION: {mission_name}</p>
            <p className="launch-rocket">ROCKET: {rocket.rocket_name}</p>
            {renderVideoLink(links.video_link)}
        </div>
    ));

const Launches = ({rocketName, missionName, launchYear}: Props) => {
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

    return renderLaunchList(launches as any);
};

export default Launches;
