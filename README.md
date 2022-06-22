# favs-api (WIP)
Api for favs, the new company that aims to provide a better way to organize your favorite things: music, clothes, courses, etc., all in one place. 

## Built with
- Node
- Mongoose
- Mongo

## Getting Started
1. Get the environment variables in the report
2. Clone this repository
3. Execute npm install
4. Use postman to test the API.

## How to run
1. Register with a valid email (e.g carloanc@gmail.com) and a valid password (e.g 12345678Az) in the url http://localhost:8080/users/register/
2. With the token you get, you can make the next requests adding it to the header as Authorization. (Don't forget to type Bearer before the token in the field).
3. These are the requests you can do:
  - Create list (POST: http://localhost:8080/lists). Yo need a name.
  - Find user's list (GET: http://localhost:8080/lists)
  - Find a specific list (GET: http://localhost:8080/lists/:listId)
  - Delete one list for unique id (DELETE: http://localhost:8080/lists/:listId)
  - Create a fav in a list (POST: http://localhost:8080/favs/:listId)
