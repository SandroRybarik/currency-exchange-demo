# Currency Exchange Demo

Purpose: demonstrate mainly React skills while using other libraries.

## Development

1. Install npm deps `npm --prefix ./client i && npm --prefix ./server i`
1. To start local server `PORT=3333 npm --prefix ./server run dev`
1. To start local react app `REACT_APP_API="http://localhost:3333" npm --prefix ./client start`

Note:

The best node environment for this project is above or equal v18.13.0 because of [fetch function](https://stackoverflow.com/questions/74677483/the-fetch-api-is-an-experimental-feature-this-feature-could-change-at-any-time).


## Deployment

Standalone vercel deployments.

Connect client to server through env variable _REACT_APP_API_.

- SERVER
  - `npx vercel -e NODE_ENV=production server` outputs deployment _URL_
- CLIENT
  - `npx vercel -b REACT_APP_API="<URL>" client`
