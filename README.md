# Sage

## Table of Contents

1. [About](#about)
1. [Team](#team)
1. [Dependencies](#dependencies)
1. [Running](#running)

## About

![Sage Web App](http://i.imgur.com/lzyoBK9.png)

Sage is a task management application for organizations.  Managers can easily create an organization, invite users and organize those users into separate project teams.  Each project can create and assign tasks to individual users, which they can mark off as complete.  

Sage is built using a compenent based Angular architecture written in ES6.  The frontend is bundle and transpiled using a combination of Gulp and Webpack.  Bootstrap was used to style the UI.

The server and API are written in ExpressJS and the data is store in MongoDB through mongoose.


__Front End__: Angular JS, Bootstrap
__Back End__: Node.js, Express, MongoDB
__Testing__: Chai, Mocha, Karma  
__Build Tools__: Gulp, Webpack    
__Deployment__: Digital Ocean  

## Dependencies

## Running

```
npm install
gulp
npm start
```