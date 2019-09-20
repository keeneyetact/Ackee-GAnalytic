import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const Row = (props) => {

	return (
		h('div', {
			className: 'flexList__row flexList__row--has-hover',
			onMouseEnter: props.onEnter,
			onMouseLeave: props.onLeave
		},
			h('div', { className: 'flexList__column flexList__column--text-adjustment' },
				h('span', { className: 'flexList__truncated' }, props.text)
			)
		)
	)

}

const PresentationList = (props) => {

	return (
		h('div', { className: 'flexList' },
			h('div', { className: 'flexList__inner' },
				props.items.map((item, index) => (
					h(Row, {
						key: item.text + index,
						onEnter: () => props.onEnter(index),
						onLeave: () => props.onLeave(index),
						...item
					})
				))
			)
		)
	)

}

PresentationList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired
	})).isRequired,
	onEnter: PropTypes.func.isRequired,
	onLeave: PropTypes.func.isRequired
}

export default PresentationList