import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { City } from './types'
import db from './db'
import { log } from 'console'

dotenv.config()

const URL = process.env.API_URL || 'https://data.waltti.fi'

const secretSauce = Buffer.from(
  `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
).toString('base64')

log(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)

const authHeaders = {
  Authorization: `Basic ${secretSauce}`
}

const headers = {
  ...authHeaders
}

const getVehiclePosition = async (city: City) => {
  try {
    const response = await fetch(
      `${URL}/${city}/api/gtfsrealtime/v1.0/feed/vehicleposition`,
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

    console.log('feed', feed)

    db.setVehiclePosition(feed)

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

const getLuke = async () => {
  try {
    const result = await fetch('https://swapi.dev/api/people/1')
    const data = await result.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export { getVehiclePosition, getLuke }
