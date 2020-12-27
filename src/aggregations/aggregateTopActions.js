'use strict'

const ranges = require('../constants/ranges')
const matchEvents = require('../stages/matchEvents')

module.exports = (ids, range, limit, dateDetails) => {

	const aggregation = [
		matchEvents(ids),
		{
			$group: {
				_id: {
					key: '$key'
				},
				count: {
					$sum: '$value'
				}
			}
		},
		{
			$sort: {
				count: -1
			}
		},
		{
			$limit: limit
		}
	]

	aggregation[0].$match.key = { $ne: null }

	if (range === ranges.RANGES_LAST_24_HOURS) {
		aggregation[0].$match.created = { $gte: dateDetails.lastHours(24) }
	}

	if (range === ranges.RANGES_LAST_7_DAYS) {
		aggregation[0].$match.created = { $gte: dateDetails.lastDays(7) }
	}

	if (range === ranges.RANGES_LAST_30_DAYS) {
		aggregation[0].$match.created = { $gte: dateDetails.lastDays(30) }
	}

	if (range === ranges.RANGES_LAST_6_MONTHS) {
		aggregation[0].$match.created = { $gte: dateDetails.lastMonths(6) }
	}

	return aggregation

}