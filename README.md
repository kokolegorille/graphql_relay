# GrahQL w/ Node & React Relay

Server

    "express": "^4.15.4",
    "express-graphql": "^0.6.7",
    "graphql": "^0.10.5",
    "graphql-relay": "^0.5.2",

Client

    "babel-polyfill": "^6.16.0",    
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-relay": "^1.2.0",
    "whatwg-fetch": "^2.0.3"


Dev dependencies

    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-eslint": "^7.2.3",
    "babel-loader": "^7.1.2",
    "babel-plugin-relay": "^1.2.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "babel-runtime": "^6.26.0",
    "eslint": "^4.5.0",
    "eslint-config-fbjs": "1.1.1",
    "eslint-plugin-babel": "3.3.0",
    "eslint-plugin-flowtype": "2.15.0",
    "eslint-plugin-react": "^7.3.0",
    "relay-compiler": "^1.2.0",
    "webpack": "^3.5.5"    

## Initialisation

```bash
$ mkdir graphql_relay
$ git init
$ git add .
$ git commit -m "Initial commit"
```


```bash
$ vim .gitignore
.DS_Store
**/__generated__
/node_modules
```


```bash
$ yarn init -y
$ touch README.md
```

## Server side

Add 

  .babelrc
  server.js
  /data
    schema.js
  /scripts
    update_schema.js

Update package.json

```
{
  "name": "graphlql_relay",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "babel-node ./server.js",
    "update-schema": "babel-node ./scripts/update_schema.js"
  },
  "author": "koko.le.gorille <koko.le.gorille@gmail.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.15.4",
    "express-graphql": "^0.6.7",
    "graphql": "^0.10.5",
    "graphql-relay": "^0.5.2"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1"
  }
}
```

$ yarn 
$ yarn update-schema

## Configure Eslint

Add eslint globally

$ yarn global add eslint

Bootstrap eslint, answer to some questions, select format

$ eslint --init

$ mv .eslintrc.js .eslintrc

Add .eslintignore

$ vim .eslintignore
__generated__


Add script to package.json to run linting

"lint": "eslint src"

$ yarn lint

## Add data and complex schema

Add 
  data/
    data.json
    database.js

Update data/schema

## GraphQL sample queries

Pagination

{
  videos(first: 2) {
    totalCount,
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    },
    edges {
      node {
        id
        title
        duration
        watched
      }
    }
  }
}

Node interface

{
  node(id: "VmlkZW86YjUxYWVjMWVkYmIwOWE3ZmZlMDU=") {
    ... on Video {
      id,
      title,
      duration,
      watched
    }
  }
}

Mutation with query variables

mutation AddVideoQuery($input: AddVideoInput!) {
  createVideo(input: $input) {
    video {
      id,
      title
    }
  }
}

{
  "input": {
    "title": "Yo c moi Mike le rappeur",
    "duration": 180,
    "watched": false,
    "clientMutationId": "abcd"
  }
}