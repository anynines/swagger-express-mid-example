FROM node:latest

LABEL maintainer="anynines <platform-dev@anynines.com>"

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app
RUN yarn

# add current folder to workdir
ADD . /usr/src/app

EXPOSE 8000
CMD [ "yarn", "start" ]
