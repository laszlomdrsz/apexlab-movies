# Notes and instructions

## Viewing the project

The app is available to try on [http://apexlabs.webfejlesztomentor.hu/](http://apexlabs.webfejlesztomentor.hu/).

## Starting the project locally

1. Pull this repository.
2. Run `npm install`.
3. Duplicate `sample.env` as `.env` and set `REACT_APP_OMDB_API_KEY` to a valid OMDB API key.
4. Run `npm start`.
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running tests

### End-to-end tests

1. Complete the first 3 steps for starting locally.
2. Run `npm run e2e` (or `npm run cypress:open` if `npm start` is already running).
3. Cypress test runner will start, but wait for the web server to start on [http://localhost:3000](http://localhost:3000).
4. When the web server has started, run Integration tests folder in Cypress.

### Unit tests

1. Complete at least the first 2 steps for starting locally.
2. Run `npm run test`.


## Notes about the task

- Instead of CSS stylesheets, I used Material UI system and style properties directly on the elements. This looks similar to inline CSS, but it is the recommended way by MUI developers and I also found it to be a clean solution.
- I haven't implemented proper HTML semantics (e.g. H tags) because it would have required changing the layout of the app and didn't seem to matter that much for the scope of this project.
- Although design was secondary, I had a lot of fun with MUI, so I used this project as an opportunity to experiment with some of its features (skeletons as loading animations instead of spinners, crossfade function, stars for displaying movie scores).
- Ideally, all of the services would implement interfaces, which would be required by the component calling them, instead of requiring the service itself. But for the size of this project, this seemed like too much effort and added complexity.
- Two components and all of the services are missing unit tests because writing tests was already cumbersome and I didn't want to spend more time on this task.