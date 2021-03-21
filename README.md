### FRONTEND

This is the frontend of the Cant Stand Still app.
The backend [is here](https://github.com/Noah-Silvera/cant-stand-still-api)

## Cant Stand Still

This is an application which aims to allow connect and visualize your strava data as trips over a time period. It will allow you to login with Strava, create "trips" that span date ranges, and view those trips as connected rides on a map, along with some stats.

[Check it out here!](https://cant-stand-still-frontend.vercel.app/) (WIP)

## Development Setup

1. Clone the repository
1. Ensure you have the node version specified in the .tool-versions file (Also, you should check out [ASDF](https://github.com/asdf-vm/asdf))
3. Run `yarn install`
4. Run the nextjs server `yarn dev -p 4000`
    * _You can change the port the server runs on, but you will need to overide the PORT variable in your [.env.local](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) file_
## Running the tests

This app just has feature specs, which can be run with cypress

To open cypress run `yarn test`

## Testing with the frontend

This server is meant to be run in [tandem with the backend](https://github.com/Noah-Silvera/cant-stand-still-api). By default, this application is hooked up to a testing deployment of the app, but if you want to test both repos in tandem, you should hook them up together locally.


1. Create an `.env.local` file
1. Overide the `SERVER_HOST` variable with your locally running api server. e.g. `http://localhost:3000`
