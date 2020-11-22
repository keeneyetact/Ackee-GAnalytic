import { createElement as h, Fragment } from 'react'

import enhancePages from '../../enhancers/enhancePages'
import pagesLoader from '../../loaders/pagesLoader'
import * as selectDomainsValue from '../../selectors/selectDomainsValue'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetIds from '../../utils/useWidgetIds'

import CardPages from '../cards/CardPages'

const RoutePages = (props) => {

	const widgetIds = useWidgetIds(props, pagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

	return (
		h(Fragment, {},

			widgetIds.map(
				(widgetId) => {
					const widget = props.widgets.value[widgetId]
					if (widget == null) return h('p', {}, 'empty')

					const domain = selectDomainsValue.byId(props, widget.variables.domainId)

					return h(CardPages, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhancePages(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RoutePages