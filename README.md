# lora-track

Map to show tracked lora data for KPN IoT workshop

Runs an in-memory database, so on restart the database will be reset and all recorded data will be lost.

Can be deployed to Azure Web App.

Runs on [Next.JS](https://nextjs.org)

## Running

- npm run dev
    Starts the development server.
- npm run build
    Builds the app for production.
- npm start
    Runs the built app in production mode.

1. install: `npm i`
2. build: `npm run build`
3. start server in production mode: `npm start`
4. seed with dummy data: `./postDummyData.sh`

Development: 

- `npm run dev`