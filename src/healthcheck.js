#!/usr/bin/env node
'use strict'
require('dotenv').config()

const fetch = require('node-fetch')

const signale = require('./utils/signale')
const checkMongoDB = require('./utils/connect')

const port = process.env.ACKEE_PORT || process.env.PORT || 3000
const dbUrl = process.env.ACKEE_MONGODB || process.env.MONGODB_URI
const serverUrl = `http://localhost:${ port }`

if (dbUrl == null) {
	signale.fatal('MongoDB connection URI missing in environment')
	process.exit(1)
}

const checkServer = async (url) => {
	const res = await fetch(url)

	if (res.ok === false) {
		throw new Error(`Server is unhealthy and returned with the status '${ res.status }'`)
	}
}

const checkApi = async (url) => {
	const res = await fetch(url)

	if (res.ok === false) {
		throw new Error(`API is unhealthy and returned with the status '${ res.status }'`)
	}
}

const exit = (healthy) => process.exit(healthy === true ? 0 : 1)

const check = () => Promise.all([
	checkMongoDB(dbUrl),
	checkServer(serverUrl),
	checkApi(`${ serverUrl }/.well-known/apollo/server-health`)
])

const handleSuccess = () => {
	signale.success('Ackee is up and running')
	exit(true)
}

const handleFailure = (err) => {
	signale.fatal(err)
	exit(false)
}

check()
	.then(handleSuccess)
	.catch(handleFailure)