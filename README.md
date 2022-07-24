# Todo-List
## Simple Todo List built using Java and ReactJS

------------
### Quick start (Need Docker with Docker compose plugin):

Clone it to your computer/server with:
``` git clone https://github.com/somik123/todo-list.git ```

Compile it with:
``` sudo docker compose build ```

And run it with docker compose :
``` sudo docker compose up -d ```

It'll take a bit of time to compile the front-end and back-end docker images and once done, it'll launch 3 docker containers, containing MariaDB, Java RESTful CRUD and ReactJS.

------------

Do note that on first use, you need to setup the database by using the Installer. You can do this by going to: http://localhost:8080/todo/install

If you are accessing it on the server, replace "localhost" with your server ip address like: http://123.12.23.34:8080/todo/install

------------

###The rest endpoints are:

```
- GET     /todo/install		Setup tables in the database

- POST    /todo 		Insert in todo list
- GET     /todo 		Get all exising rows from todo list
- GET     /todo/{id} 		Get one row from todo list by id
- PUT     /todo/{id} 		Update one row in todo list by id
- GET     /todo/{id}/1          Mark a task as completed
- GET     /todo/{id}/0          Mark a task as incompleted
- DELETE  /todo/{id} 		Delete one row from todo list by id
```

------------

### Testing
Test cases in the "testing" folder uses postman for backend API testing, selenium for frontend testing.
The React.js test cases are also implemented and can be run from inside the frontend directory using 

```npm test```
