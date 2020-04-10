'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const constants = require('../constants/referrers')

const getTop = async (id, dateRange) => {

	return Record.aggregate(
		aggregateTopFields(id, 'siteReferrer', dateRange)
	)

}

const getNew = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, 'siteReferrer')
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, 'siteReferrer')
	)

}

const get = async (id, sorting, dateRange) => {

	switch (sorting) {
		case constants.REFERRERS_SORTING_TOP: return getTop(id, dateRange)
		case constants.REFERRERS_SORTING_NEW: return getNew(id)
		case constants.REFERRERS_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}