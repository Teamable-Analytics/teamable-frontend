FROM node:20.16.0
RUN mkdir /code
WORKDIR /code
COPY package.json /code/
COPY yarn.lock /code/
COPY . /code
RUN yarn
RUN yarn build
EXPOSE 3000