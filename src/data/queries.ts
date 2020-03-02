import {gql} from 'apollo-boost';

export const LAUNCHES_QUERY = gql`
    query Launches(
        $rocketName: String!
        $missionName: String!
        $launchYear: String!
        $offset: Int!
    ) {
        launches(
            find: {
                rocket_name: $rocketName
                mission_name: $missionName
                launch_year: $launchYear
            }
            order: "asc"
            sort: "launch_date_local"
            limit: 10
            offset: $offset
        ) {
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

export const LAUNCH_YEARS_QUERY = gql`
    {
        launches(order: "desc", sort: "launch_year") {
            launch_year
        }
    }
`;
