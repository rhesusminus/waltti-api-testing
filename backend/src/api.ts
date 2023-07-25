import fetch from 'node-fetch'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import { CITIES } from './constants'

const URL = process.env.API_URL || 'https://data.waltti.fi'

const authHeaders = {
  Authorization: `Authorization: Basic ${process.env.CLIENT_SECRET}`
}

const headers = {
  ...authHeaders
}

const getVehiclePosition = async () => {
  try {
    const response = await fetch(
      `${URL}/${CITIES.OULU}/api/gtfsrealtime/v1.0/feed/vehicleposition`,
      {
        method: 'GET',
        headers
      }
    )

    if (!response.ok) {
      throw new Error(
        `${response.url}: ${response.status} ${response.statusText}`
      )
    }

    const buffer = await response.arrayBuffer()
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer)
    )

    feed.entity.forEach((entity) => {
      if (entity.tripUpdate) {
        console.log(entity.tripUpdate)
      }
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export { getVehiclePosition }
