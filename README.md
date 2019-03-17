# Ackee

[![Travis Build Status](https://travis-ci.org/electerious/Ackee.svg?branch=master)](https://travis-ci.org/electerious/Ackee) [![Coverage Status](https://coveralls.io/repos/github/electerious/Ackee/badge.svg?branch=master)](https://coveralls.io/github/electerious/Ackee?branch=master) [![Dependencies](https://david-dm.org/electerious/Ackee.svg)](https://david-dm.org/electerious/Ackee#info=dependencies) [![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CYKBESW577YWE)

Ackee helps you to track your sites, know more about your visitors and to analyze your traffic.

![Ackee in a browser](https://s.electerious.com/images/ackee/readme.png)

## Contents

- 🏃 [Get started](#get-started)
- 📄 [Introduction](#introduction)
- ⚙️ [Documentation](#documentation)

## Get started

Get Ackee up and running…

- […with Docker Compose](docs/Get%20started.md#with-docker-compose)
- […with Docker](docs/Get%20started.md#with-docker)
- […without Docker](docs/Get%20started.md#without-docker)

And configure Ackee and your server correctly…

- […with environment variables](#options)
- […with SSL and HTTPS enabled](docs/SSL%20and%20HTTPS.md)

## Introduction

### What is Ackee?

Ackee is a lightweight, self-hosted alternative to Google Analytics. It features an API and web interface and tracks only what's really necessary.

### Why Ackee?

Because nobody should share information about their visitors with others. The big players already know enough about us.

- Self-hosted
- Written in Node.js
- Lightweight and minimal user interface
- Respects the privacy settings of your users
- No unique user tracking and no cookies

### How does it work?

You run the Ackee server which than waits for requests through its API.

The API of Ackee accepts information about your visitors sent to it using [ackee-tracker](https://github.com/electerious/ackee-tracker). It's a small script you add to your sites, similar to the JavaScript tracking snippet provided by Google Analytics.

The interface of Ackee lets you view and analyse your tracked information.

## Documentation

### Requirements

Ackee depends on...

- [Node.js](https://nodejs.org/en/) (v8.11.0 or newer)
- [yarn](https://yarnpkg.com/en/)
- [MongoDB](https://www.mongodb.com) (v4.0.6 or newer)

Make sure to install and update all dependencies before you setup Ackee.

### API

- [/](docs/UI.md)
- [/tokens](docs/tokens.md)
- [/domains](docs/domains.md)
- [/domains/:domainId/records](docs/records.md)
- [/domains/:domainId/views](docs/views.md)

### Options

The following environment variables are used by Ackee. You can also create a [`.env` file](https://www.npmjs.com/package/dotenv) in the root of the project to store all variables in one file.

#### Database

MongoDB connection URI. See the [MongoDB connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more detail.

```
MONGODB=mongodb://localhost:27017/ackee
```

#### Port

The port Ackee should listen on. Defaults to `3000`.

```
PORT=3000
```

#### Username and password

Username and password. Both are required to generate a new token.

```
USERNAME=username
PASSWORD=password
```

#### TTL

Specifies how long a generated token is valid. Defaults to `3600000` (1 day).

```
TTL=3600000
```

#### Environment

Set the environment to `development` to see additional details in the console and to disable caching.

```
NODE_ENV=development
```