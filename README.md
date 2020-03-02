# EVGO-SPACEX-APP

React SPA - Search The SpaceX GraphQL server for upcoming and past SpaceX launches.

## TODOS

### Requirements
- Setup CRA + initialize git repo
- Add apollo dependencies to consume GQL data from Spacex server
- Configure Apollo
- Write initial results query / get more query to get back initial data
- Reduce upcoming and past launches to single dataset
- Wire up basic components to display data
- Add minimal styling
- Add infinite scroll to get entire result set
- Wire up Search UI for Mission Name / Rocket Name / Launch Year, modify queries to accept variables
- Add Redux or Mobx for state management? (useState may be enough for v1)

### Nice to haves
- Styling polish pass
- Display next 3 launches on results page when user first visits
- add react-video player to display youtube video in results
- add tests


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
