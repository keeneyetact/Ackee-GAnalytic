import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import { INTERVALS_DAILY } from '../../../../constants/intervals'
import { VIEWS_TYPE_UNIQUE } from '../../../../constants/views'

import Headline from '../Headline'
import Text from '../Text'
import CurrentStatus from '../CurrentStatus'
import PresentationCounterList from '../presentations/PresentationCounterList'

import useCombinedViews from '../../api/hooks/views/useCombinedViews'
import relativeDays from '../../utils/relativeDays'
import commonModalProps from '../../utils/commonModalProps'

const ModalOverviewViews = (props) => {
	const { value, status } = useCombinedViews({
		interval: INTERVALS_DAILY,
		type: VIEWS_TYPE_UNIQUE,
		limit: 14,
	})

	return (
		h('div', { className: 'card' },
			h('div', { className: 'card__inner' },

				h(Headline, {
					type: 'h2',
					size: 'medium',
				}, 'Views'),
				h(Text, {
					type: 'div',
					spacing: false,
				},
					h(CurrentStatus, status, relativeDays(props.index)),
				),
				h(PresentationCounterList, {
					items: value[props.index],
				}),

			),
			h('div', { className: 'card__footer' },

				h('button', {
					type: 'button',
					className: 'card__button card__button--primary link',
					onClick: props.closeModal,
				}, 'Close'),

			),
		)
	)
}

ModalOverviewViews.propTypes = {
	...commonModalProps,
	index: PropTypes.number.isRequired,
}

export default ModalOverviewViews