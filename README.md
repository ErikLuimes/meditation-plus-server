![License](https://img.shields.io/badge/license-MIT-blue.svg)

# REST API for Meditation+ [![Join Slack](https://img.shields.io/badge/slack-join-brightgreen.svg)](https://sirimangaloteam.slack.com)

REST API built with Node, Express, PassportJS, MongoDB, Mongoose and Socket.io.

## Quick Start

```
# inside the cloned repository

# install dependencies
$ npm install

# run server
$ gulp serve
```

## config.json

The `server.conf.js` file is expecting certain `environment` `variables` to be set within `Node`. The `env.conf.js` has functions to check whether the expected `environment` `variables` have been setup before proceeding to start up the rest of the server. It uses a file called `config.json` stored in the `config` directory that looks something like this:

```
{
  "ENV" : "development",
  "PORT" : 3000,
  "MONGO_URI" : {
    "DEVELOPMENT" : "mongodb://[username:password]@host[:port]",
    "PRODUCTION" : "mongodb://[username:password]@host[:port]",
    "TEST" : "mongodb://[username:password]@host[:port]"
  },
  # Generate your own 256-bit WEP key here:
  # http://randomkeygen.com/
  # Note that you don't need to use specifically
  # this, but it will certainly suffice
  "SESSION_SECRET" : "355FC4FE9348639B4E4FED1B8E93C"
}

You should definitely change your `SESSION_SECRET` for even the most lackadaisical development effort.
```

## Todo

- [ ] Wordpress integration
- [ ] Commitments
- [ ] Appointments