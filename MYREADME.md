# About
- The back-end for movies app

# Features
  - Create new account
  - Login
  - Create/ Update/Delte a movie
  - List movies with pagination, searching, sorting
  - Get movie details

# Techstack
NodeJS & ExpressJS & Typescript
MongoDB Cloud
# General
  - Init source, create structure folder.
  - Create MongoDB Cloud.
  - Design database.
    2 Models: User, Movie

  - Only Admin can create/update/delete movie.
  - Only User can received email when Admin created movie

# steps for start api local
- npm install
- npm run build
- npm run start

# Server
- if you want to see server.
- using key: movies-app.key.ppk
- username: ec2-user
- IP: 172.31.32.102


# document for api
- local: http://localhost:3000/api-docs
- server: http://ec2-3-131-110-250.us-east-2.compute.amazonaws.com:3000/api-docs/#/auth/loginWithForm

base url api:
- local: http://localhost:3000/v1/
- server: http://ec2-3-131-110-250.us-east-2.compute.amazonaws.com:3000/v1

# Note.
2022/05/11. i will stop server.
