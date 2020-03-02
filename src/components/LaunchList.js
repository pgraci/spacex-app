import React from 'react';

import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

import {slugify} from '../utils/string_helpers';
import {formatDate} from '../utils/date_helpers';

const LAUNCHES_QUERY = gql`
    {
        launches(find: {rocket_name: "", mission_name: "", launch_year: ""}) {
            id
            launch_year
            launch_date_local
            links {
                video_link
            }
            mission_name
            rocket {
                rocket_name
            }
        }
    }
`;

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

const LaunchList = () => {
    const {loading, error, data} = useQuery(LAUNCHES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        data &&
        data.launches.map(
            ({id, launch_date_local, links, mission_name, rocket}) => (
                <div
                    key={`${id}-${slugify(mission_name)}`}
                    className="launch-wrapper"
                >
                    <p className="launch-date">
                        {formatDate(launch_date_local)}
                    </p>
                    <p className="launch-mission">MISSION: {mission_name}</p>
                    <p className="launch-rocket">
                        ROCKET: {rocket.rocket_name}
                    </p>
                    {renderVideoLink(links.video_link)}
                </div>
            )
        )
    );
};

export default LaunchList;
