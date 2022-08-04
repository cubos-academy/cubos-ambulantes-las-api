![](https://i.imgur.com/xG74tOh.png)

## LAS - API
<p align="center"><b>Salvador street vendor management system</b></p>

## Techs
- NestJS
- Typescript
- TypeOrm + PostgreeSQL
- Docker

## Requirements
- NodeJS installed on your machine
- Docker installed on your machine

## How to install
- Clone this repo
- Open your terminal and type
```
npm install
```

After a while, all dependencies for run this project will be installed and you can follow next steps.

- Now, let's configure environments variables, type on your terminal the following command
```
cp .env.example .env
```
Open .env file inside project root folder and configure the environments variables

- Now start database server with docker command
```
docker-compose up -d
```
You can check whether everything are done looking at Docker client interface

- Now, you can connect to postgree database inside docker container and create the database.

Note: i've configured the docker-compose to arrive with `adminer`, to open adminer dashboard just open
```
http://localhost:8080/
```
with `adminer` dashboard you can create database that you configured on .env file

- Finally, you can start the server with this command
```
npm run start:dev
```

## Testing
- We use Jest in our tests and you can test the applicaton just typing 
```
npm run test
```
on your terminal

## How to contribute?
- You can find bugs or dangerous code 
- You can open an issue ticket on 'issues' tab
- You can feel free to make this project better in any aspects
```
After contribute, you just need to submit an pull request.
```

## Production
The API has already in production on: https://cubos-las-api.herokuapp.com/api/
