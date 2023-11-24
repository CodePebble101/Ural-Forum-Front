FROM node:18
RUN apt-get update
WORKDIR /frontend
COPY . .

RUN yarn install
CMD yarn vite
EXPOSE 10091
