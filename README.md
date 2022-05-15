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
- Docker installed

## How to install
- Clone this repo
- Open your terminal and type
```
npm install
```

After a while, all dependencies for run this project will be installed and you can follow next steps.

- Now start database server with docker
```
docker-compose up -d
```
You can check whether everything are done looking at Docker client interface

- Now run database migrations
```
npx typeorm migration:run
```
This command insert on database all necessary schemas that we need.

- Finally, you can start the server with this command
```
npm run start
```

## Testing
- We use Jest in our tests and you can test the applicaton just typing 
```
npm run test
```
on your terminal
