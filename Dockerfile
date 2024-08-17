FROM node:18.20.2
RUN mkdir /code
WORKDIR /code
COPY package.json /code/
COPY yarn.lock /code/
COPY . /code
RUN yarn
RUN yarn build
EXPOSE 3000