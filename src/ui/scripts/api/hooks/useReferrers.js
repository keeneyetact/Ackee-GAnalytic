import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const QUERY = gql`
	query fetchReferrers($sorting: Sorting!, $type: ReferrerType!, $range: Range) {
		statistics {
			id
			referrers(sorting: $sorting, type: $type, range: $range) {
				id
				count
			}
		}
		domains {
			...domainFields
			statistics {
				id
				referrers(sorting: $sorting, type: $type, range: $range) {
					id
					count
					created
				}
			}
		}
	}

	${ domainFields }
`

export default (sorting, type, range) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			sorting,
			type,
			range
		}
	})

	return {
		fetching,
		value: data == null ? { statistics: { pages: [] }, domains: [] } : data
	}

}