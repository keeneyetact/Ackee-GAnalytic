export const SET_TOKEN_VALUE = Symbol()
export const SET_TOKEN_FETCHING = Symbol()
export const SET_TOKEN_ERROR = Symbol()

export const setTokenValue = (payload) => ({
	type: SET_TOKEN_VALUE,
	payload
})

export const setTokenFetching = (payload) => ({
	type: SET_TOKEN_FETCHING,
	payload
})

export const setTokenError = (payload) => ({
	type: SET_TOKEN_ERROR,
	payload
})

export const postToken = (props) => async (dispatch) => {

	dispatch(setTokenFetching(true))
	dispatch(setTokenError())

	try {

		const response = await fetch('/tokens', {
			method: 'post',
			body: JSON.stringify(props)
		})

		if (response.ok === false) {
			const text = await response.text()
			throw new Error(text)
		}

		const json = await response.json()
		const token = json.data.id

		dispatch(setTokenFetching(false))
		dispatch(setTokenValue(token))

	} catch (err) {

		console.error(err)

		dispatch(setTokenFetching(false))
		dispatch(setTokenError(err.message))

	}

}