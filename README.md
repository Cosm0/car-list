# Car list

## API TODO

- hashed user pswd in db
- change current vehicle position (longitude/latitude) to address
- add / remove / edit renters
- renting a car - link a renters with a vehicle
- feeding database with dummy data for dev environment
- use faker to construct dummy data

## FRONT TODO

- add header with nav panel
- implement logout
- global requests errors handling
- vehicles list loading spinner
- vehicles list error message in case request failed
- adding/editing/deleting a vehicle (task business logic)
- containerize frontend (prod and dev environments)
- use NgRx
- use standalone components
- use pipes to present data (e.g. GPS coordinates) in vehicles table or to present 'no data' (e.g. no renter)
- use translations instead of hardcoded names (e.g. columns names)
- use ANY styling - implement custom Angular marerial styling
- use Angular material for login form
- display invalid credentials error in case wrong credentials are used

## General

- move common interfaces (used by front and api) to some shared folder
