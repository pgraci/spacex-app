# EVGO-SPACEX-APP

## Search The SpaceX GraphQL server for upcoming and past SpaceX launches.

Implements a React SPA using Typescript and ApolloClient to consume the SpaceX GraphQL server data.

An initial result set of 10 launches is loaded. As the user scrolls in the app, more results are fetched and loaded.

Searches by Rocket name, Mission name, and Year are also supported.

Available years are populated by a seperate query, to limit the options to the available result set.

## Install dependencies

### `yarn`

## Start or Build the app

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
