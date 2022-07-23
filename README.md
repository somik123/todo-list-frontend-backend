# Todo-List
## Simple Todo List built using Java and ReactJS

------------
### Quick start:
Clone it to your computer/server with:
``` git clone https://github.com/somik123/todo-list.git ```

And run it with docker compose (Need Docker with Docker compose plugin):
``` sudo docker compose up -d ```

It'll take a bit of time to compile the front-end and back-end docker images and once done, it'll launch 3 docker containers, containing MariaDB, Java RESTful CRUD and ReactJS.

------------

Do note that on first use, you need to setup the database by using the Installer. You can do this by going to: http://localhost:8080/todo/install

If you are accessing it on the server, replace "localhost" with your server ip address like: http://123.12.23.34:8080/todo/install

------------

The rest endpoints are:
```
- GET     /todo/install		Setup tables in the database

- POST    /todo 		Insert in todo list
- GET     /todo 		Get all exising rows from todo list
- GET     /todo/{id} 		Get one row from todo list by id
- PUT     /todo/{id} 		Update one row in todo list by id
- DELETE  /todo/{id} 		Delete one row from todo list by id
```

------------
