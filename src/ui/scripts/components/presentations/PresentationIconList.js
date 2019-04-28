import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Favicon from '../Favicon'

const Row = (props) => (

	h('a', {
		className: 'iconList__row',
		href: props.url.href,
		target: '_blank',
		onMouseEnter: props.onEnter,
		onMouseLeave: props.onLeave
	},
		h(Favicon, { url: props.url.href }),
		h('span', { className: 'iconList__hostname' }, props.url.hostname),
		h('span', { className: 'iconList__pathname' }, props.url.pathname)
	)

)

const PresentationIconList = (props) => (

	h('div', { className: 'iconList' },
		h('div', { className: 'iconList__inner' },
			props.items.map((item, index) => (
				h(Row, {
					key: index,
					onEnter: () => props.onEnter(index),
					onLeave: () => props.onLeave(index),
					...item
				})
			))
		)
	)

)

PresentationIconList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PresentationIconList