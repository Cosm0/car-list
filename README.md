# CAR LIST APP

## Frontend: things done

- implemented with Angular. It's not finished and has not been containerized due to time limitations. For now to run it, Anglar CLI needs to be used `npm run start:open` (there is `npx ng serve` used within this npm command).
- implemented modules:
  - app (root module)
    - implemented guards for checking if a user can access a route - needs to be moved to shared module probably
  - auth:
    - implemented sign in that saves received user token to session storage
    - implemented auto sign in if auth token is still valid
    - implemented auth interceptor that intercepts backend requests and adds auth header if user is logged in
  - shared
    - added only to import some shared stuff from angular modules (could also add import of angular material modules)
    - error handling interceptor (not used yet, added to TODO list to use it)
  - vehicles
    - just a list of vehicles for now

## Backend

- implemented with NestJS + TypeORM
- utilizes mySQL db
- implemented modules:
  - app - juts a root module. Also contains `status` endpoint that does not require authentication
  - auth - uses `passport` lib for handling auth: two guards implemented using local or jwt strategy for handling requests. The act as middleware for evaluating whether request is authenticated
  - shared - for now just configuration stuff
  - renters - contains endpoints related with renters
  - users - contains endpoints related with rentusersers
  - vehicles - contains endpoints related with vehicles
- global exception filter implemented
- implemented migrations (`./api/typeorm/migration`) - used for production environment to create tables and feed db with some dummy data

## DevOps and containerization

- added two docker-compose files:
  - docker-compose.dev.yml - used for runinng development environment (check Makefile)
  - docker-compose.yml - used for runinng production environment (check Makefile)
- added couple make scripts to ease-up on couple tasks:
  - buildApi - as the name says, it transpiles api typescipt files to javascript
  - containerizeApi / containerizeApiNoCache - builds API docker image
  - runDev - allows runinng development environment. API keeps track of local changes and applies them in a running container
  - runProd - allows runinng production environment
  - implemented API and DB containers healthchecks - API waits for DB to be healthy

## How to run

Prerequisites 
- `Make` package installed (`sudo apt install -y make`)
- Docker installed

### Dev environment

By running the environment in a way described below, local changes are applied to a running apps

1. install api dependencies by running `npm i` while beeing in `./api` directory
2. install frontend dependencies by running `npm i` while beeing in `./front` directory
3. while in root directory run `make runDev` - `car-list-api` image will be built and run as a container
4. run frontend using angular cli - go to `./front` subdir and run `npm run start:open` - `http://localhost:4200` will be opened in your default browser
5. it has not yet been implemented to feed database with some test data when running development environment so some sql commands need to be run manually using db manager of your choice (find the commands in `./api/db-cmds/feed-dev-db.sql`).
6. login using credentials (user: test / password: test123)

### Prod environment

Only backend has been implemented to run as production.

1. while in project root dir build api image by running `make containerizeApiNoCache`
2. run backend with `make runProd` - no need to run any sql commands manually to feed db with test data, mirations will handle that (of course dummy data should be eventually removed from migrations for production environment)
3. as running frontend as production has not yet been implemented it needs to be run using angular cli just like described in `Dev environment` chapter
4. login using credentials (user: test / password: test123)

## TODO LIST

There is a whole bunch of stuff to be done. Below are listed most crucial points for both frontend and backend that should be implemented to improve the app.

### API TODO

- hashed user pswd in db
- change current vehicle position (longitude/latitude) to address
- add / remove / edit renters
- renting a car - link a renters with a vehicle
- feeding database with dummy data for dev environment
- use faker to construct dummy data

### FRONT TODO

- add header with nav panel
- implement logout
- global requests errors handling
- vehicles list loading spinner
- vehicles list error message in case request failed
- adding/editing/deleting a vehicle
- containerize frontend (prod and dev environments)
- use NgRx
- use standalone components
- use pipes to present data (e.g. GPS coordinates) in vehicles table or to present 'no data' (e.g. no renter)
- use translations instead of hardcoded names (e.g. columns names)
- use ANY styling - implement custom Angular marerial styling
- use Angular material for login form
- display invalid credentials error in case wrong credentials are used
- update to latest Angular
- move guards to shared module

### General

- move common interfaces (used by front and api) to some shared folder
