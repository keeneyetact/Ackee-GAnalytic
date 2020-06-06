import bestMatch from '../utils/bestMatch'

const getText = ({ id }) => {

	return bestMatch([
		[ `${ id.deviceManufacturer } ${ id.deviceName }`, [ id.deviceManufacturer, id.deviceName ]],
		[ `${ id.deviceManufacturer }`, [ id.deviceManufacturer ]]
	])

}

export default (devices) => {

	return devices.map((device) => ({
		text: getText(device.data),
		count: device.data.count,
		date: device.data.created == null ? null : new Date(device.data.created)
	}))

}