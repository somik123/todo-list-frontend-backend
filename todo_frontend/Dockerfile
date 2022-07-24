# pull the base image to build application
FROM node:alpine as build

# get the env variables and pass them for building
ARG REACT_APP_API_HOST

# set the working direction
WORKDIR /app

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# copy main app
COPY ./public ./public/ 
COPY ./src ./src/

RUN REACT_APP_API_HOST=${REACT_APP_API_HOST} \ 
  npm run build


# Use nginx to run application
FROM nginx:alpine

# add app
COPY --from=build /app/build /usr/share/nginx/html

# start app
CMD ["nginx", "-g", "daemon off;"]