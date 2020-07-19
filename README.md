# Getir Case Study
[![CircleCI](https://circleci.com/gh/besimgurbuz/getir-case-study.svg?style=shield&circle-token=c60446bc58a36a868e613402f62d07dcaef3d7e1)](https://app.circleci.com/pipelines/github/besimgurbuz/getir-case-study)

A RESTful API build with Node.js, Express and MongoDB.


## Table of contents
* [Installation](#installation)
* [Extra Added Features](#extra-added-features)
* [API Document](#api-document)
* [Error Meanings](#error-meanings)
* [Live Demo](#live-demo)

## Installation
Clone repository
```
git clone https://github.com/besimgurbuz/getir-case-study.git
```
Install dependencies
```
cd getir-case-study
npm install
```
Create **.env** file and put correct credentials
```
mv ./.env.sample ./.env
```
In **.env** file you should put *DB_USERNAME* and *DB_PASSWORD* variables. As an example;
```
DB_USERNAME=USERNAME
DB_PASSWORD=PASSWORD1
```
Now you're ready to first run! There are two ways to do this; first starts the application with node, second starts with nodemon. Choice is yours;
```
# With node
npm run start

# With nodemon
npm run dev
```

## Extra Added Features
Extra used features other than specified requirements are as follows:
- ### CI/CD
  In development stage some of the most important things are adding new features properly and delivering production. <br>
  For those purposes CI/CD(continuous integration, continuous delivery)  is crucial. In this project *CircleCI* and *Heroku* used for CI/CD.
- ### Linting
  Linting is important for writing code in proper syntax and best practice.
  In this project *ESLint* used for linting.
- ### Secret Management
  In software development secrets should be never leak. For this purpose developer should manage secrets in a proper way. <br>
  In this project *dotenv* used for setting secrets as environment variables.

## API Document
Available endpoints in application
- GET `/`
  - Expected Parameters<br>
      \-
  - Response <br>
      Endpoint responds with json
      ```json
      {
        "message": "Merhaba Getir Case Study'e Hoşgeldin!"
      }
      ```
- GET `/api/v1`
  - Expected Parameters<br>
      \-
  - Response <br>
      Endpoint responds json
      ```json
      {
        "message": "API: Merhaba!!"
      }
      ```
- POST `/api/v1/records`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      - *startDate* and *endDate* properties should be in date format
      - *startDate* should be older than *endDate*
      - *minCount* and *maxCount* properties should be a number
      - *maxCount* should be greater than *minCount*
      ```json
      {
        "startDate": "2019-12-01",
        "endDate": "2019-12-09",
        "minCount": 2500,
        "maxCount": 3000
      }
      ```
  - Response <br>
    Endpoint responds with filtered records by given properties in json format
    ```json
    {
      "code": 0,
      "msg": "Success",
      "records": [
          {
              "key": "i3c2DhTA5ZB4hBLF",
              "createdAt": "2019-12-04T21:00:00.000Z",
              "totalCount": 2526
          }
      ]
    }
    ```
## Error Meanings
Application always responds in json. In this json, *code* property's value has meanings. These are;
| Code Value  | Meaning    |
| :---        |    :----:  |
| 404         |  Requested endpoint not found|
| 400         |  Request parameter or body is invalid|
| -1          |  Non-valid request body of *records* POST method|
| 0           |  Success|


## Live Demo
Application running in the cloud with Heroku. <br>
Go and play with it!
[Live Application]("https://besimgurbuz-getir-case-study.herokuapp.com/")