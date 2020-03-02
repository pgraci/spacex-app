import React from 'react';

import {useQuery} from '@apollo/react-hooks';
import {InView} from 'react-intersection-observer';

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
        <p className="launch-link">
            <a href={url} target="youtube">
                {url}
            </a>
        </p>
    );
};

const renderThumbnail = (url: string) => {
    const thumbnail = !url
        ? '/spacex.jpg'
        : `https://img.youtube.com/vi/${url.replace(
              'https://www.youtube.com/watch?v=',
              ''
          )}/hqdefault.jpg`;
    return (
        <a href={url} target="youtube">
            <img src={thumbnail} alt="thumbnail" className="launch-image" />
        </a>
    );
};

const offsetY = '10px';

const renderTrigger = () => ({ref}: {ref: any}) => (
    <div
        style={{
            height: '1px',
            width: '100 %',
            visibility: 'hidden',
            pointerEvents: 'none',
            color: 'transparent',
            overflow: 'hidden',
            position: 'relative'
        }}
        ref={ref}
    />
);

const renderLaunchList = (launches: any) =>
    launches.map(
        ({id, launch_date_local, links, mission_name, rocket}: Launch) => (
            <div key={id} className="launch">
                {renderThumbnail(links.video_link)}
                <div className="launch-details">
                    <div className="launch-mission">
                        MISSION: {mission_name}
                    </div>
                    <div className="launch-date">
                        {formatDate(launch_date_local)}
                    </div>
                    <p className="launch-rocket">
                        ROCKET: {rocket.rocket_name}
                    </p>
                    {renderVideoLink(links.video_link)}
                </div>
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
        return (
            <div className="launch-message">No matching launches found.</div>
        );
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
    const handleInView = (inView: boolean) => {
        if (inView) {
            handleLoadMore();
        }
    };
    const trigger = renderTrigger();

    // SpaceX GQL server returns duplicate data at times
    const launches = uniqBy(data.launches, 'id');
    return (
        <div className="launches">
            {renderLaunchList(launches as any)}
            <InView
                onChange={handleInView}
                rootMargin={`${offsetY} 0px 0px`}
                threshold={0}
            >
                {trigger}
            </InView>
        </div>
    );
};

export default Launches;
