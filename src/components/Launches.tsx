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
    };
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

const handleScroll = ({currentTarget}: any, onLoadMore: any) => {
    console.log('loading more');
    if (
        currentTarget.scrollTop + currentTarget.clientHeight >=
        currentTarget.scrollHeight
    ) {
        onLoadMore();
    }
};

const renderLaunchList = (launches: any) =>
    launches.map(
        ({id, launch_date_local, links, mission_name, rocket}: Launch) => (
            <div key={id} className="launch">
                <div className="launch-header">
                    <div className="launch-mission">
                        MISSION: {mission_name}
                    </div>
                    <div className="launch-date">
                        {formatDate(launch_date_local)}
                    </div>
                </div>
                <p className="launch-rocket">ROCKET: {rocket.rocket_name}</p>
                {renderVideoLink(links.video_link)}
            </div>
        )
    );

const Launches = ({rocketName, missionName, launchYear}: Props) => {
    const {loading, error, data, fetchMore} = useQuery(LAUNCHES_QUERY, {
        variables: {rocketName, missionName, launchYear, offset: 0}
    });

    if (loading) return <Loader />;
    if (error) return <p>Error :(</p>;

    if (!data.launches.length) {
        return <p className="launch-mission">No matching launches found.</p>;
    }

    const handleLoadMore = () => {
        if (!loading && !error) {
            fetchMore({
                variables: {
                    limit: 10,
                    offset: data.launches.length
                },
                updateQuery: (prev: any, {fetchMoreResult}) => {
                    if (!fetchMoreResult) {
                        return prev;
                    }
                    return {
                        ...prev,
                        launches: [
                            ...prev.launches,
                            ...fetchMoreResult.launches
                        ]
                    };
                }
            });
        }
    };

    // SpaceX GQL server returns duplicate data at times
    const launches = uniqBy(data.launches, 'id');

    return (
        <div
            onScroll={e => handleScroll(e, handleLoadMore)}
            className="launches"
        >
            {renderLaunchList(launches as any)}
        </div>
    );
};

export default Launches;
