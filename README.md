# dad-jokes-api

Backend RESTful API built with NodeJS with user authentication using JWT. The API can be used to store, retrieve, update and delete very 
bad jokes. Jokes are stored with keywords/tags to allow custom retrieval. API can also store and retrieve user information/login information.

## Main Technologies Used

* NodeJS
* Express
* MongoDB and Mongoose
* passport and passport-jwt


## Pending

* Although authentication is implemented, some routes still need to implement authentication in order to access them.
* Initial tests have been implemented in development (using Mocha, supertest), although have not yet been merged to github.
* Implement functionality: Allow users to mark and remove jokes from a favorite list.
* Add CONF example

## Heroku Deployment

Application is currently deployed at [Heroku](https://dashboard.heroku.com/apps/peaceful-ocean-61775), and the DB hosted at Mlab.
Use Postman to access routes.

## Authors

* **Andreas Leimbach O.** - *Initial work* - [Github profile](https://github.com/andreaslorozco)

## License

Pending...
