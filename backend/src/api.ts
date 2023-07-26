import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { City } from './types'
import { base64encode } from './utils'
import db from './db'

dotenv.config()

const { WALTTI_CLIENT_ID, WALTTI_CLIENT_SECRET } = process.env

const URL = process.env.API_URL || 'https://data.waltti.fi'

const createSecretSauce = (id?: string, secret?: string) => {
  if (!id || !secret) {
    console.log('WALTTI_CLIENT_ID or WALTTI_CLIENT_SECRET missing')
    return
  }

  return base64encode(`${id}:${secret}`)
}

const authHeaders = {
  Authorization: `Basic ${createSecretSauce(
    WALTTI_CLIENT_ID,
    WALTTI_CLIENT_SECRET
  )}`
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

    db.setVehiclePosition(feed)

    feed.entity.forEach((element) => {
      console.log(element)
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
