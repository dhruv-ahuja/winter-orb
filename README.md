## WinterOrb Frontend

WinterOrb is a website based on the game Path of Exile featuring price history data for items and a price prediction system that uses the previous pricing to try and predict future prices. It is an under-development project that will feature more features down the line. Heavily inspired by https://poe.ninja and https://poe.watch

## Setup

Run `npm install` and `npm run dev` to install dependencies and start the webserver locally. Copy or rename the `.env.example` file to `.env` and modify the given values with the equivalent real values. Do note that the token environment variable is just a placeholder until I implement proper token management and auth flow in the frontend. Adding a token through env var enables me to deploy backend APIs without exposing them to the public.
