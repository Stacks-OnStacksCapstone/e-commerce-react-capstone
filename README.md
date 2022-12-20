# React Frontend for Congo
This repository contains the React based frontend for the e-commerce application Congo.
The backend and BDD test code for Congo may be
found in the following repositories:

- [e-commerce-spring-capstone](https://github.com/JWS-P3-Team2/e-commerce-spring-capstone)
- [Team2-selenium](https://github.com/JWS-P3-Team2/Team2-selenium)

## Creating Docker Container
The easiest way to host Congo's React based frontend is
in a Docker container. Before creating a Docker image of the frontend,
it is recommended to set the target location for Congo's backend server.
By default, the backend server's location is presumed to be `localhost:8080`.
An alternate target may be chosen by changing the `baseUrl` parameter in the
`src/remote/e-commerce-api/eCommerceClient.ts` file.

Docker images of the frontend may be created using the command 
`docker build -t <image-name> .` if this repository is the shell's
current working directory. Docker containers may be created
using the command:

```docker create --name <container-name> -p <outside-port>:80 <image-name>```

Note: the default backend server will only allow the frontend to be
located at `localhost:4200` or `localhost:3000` due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). After a
container has been created, the container may be started/stopped with the
commands:

```docker start <container-name>```

```docker stop <container-name>```

If deploying locally, navigate to `localhost:<outside-port>` to view the
Congo frontend.