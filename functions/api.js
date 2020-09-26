'use strict'

const { ApolloServer } = require('apollo-server-lambda')
const { UnsignedIntResolver, UnsignedIntTypeDefinition, DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars')

const isAuthenticated = require('../src/utils/isAuthenticated')
const isDemoMode = require('../src/utils/isDemoMode')
// const isDevelopmentMode = require('../src/utils/isDevelopmentMode')
const createDate = require('../src/utils/createDate')

const apolloServer = new ApolloServer({
	introspection: false,
	playground: false,
	debug: false,
	// formatError: handleGraphError,
	typeDefs: [
		UnsignedIntTypeDefinition,
		DateTimeTypeDefinition,
		require('../src/types')
	],
	resolvers: {
		UnsignedInt: UnsignedIntResolver,
		DateTime: DateTimeResolver,
		...require('../src/resolvers')
	},
	context: async (integrationContext) => ({
		isDemoMode,
		isAuthenticated: await isAuthenticated(integrationContext.event.headers['authorization']),
		dateDetails: createDate(integrationContext.event.headers['time-zone']),
		req: integrationContext.req
	})
})

exports.handler = apolloServer.createHandler()