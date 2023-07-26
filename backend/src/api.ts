import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { City } from './types'
import { base64encode, decodeFeedMessage } from './utils'
import db from './db'

dotenv.config()

const { WALTTI_CLIENT_ID, WALTTI_CLIENT_SECRET, API_URL } = process.env

const URL = API_URL ?? 'https://data.waltti.fi'

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
      { headers }
    )

    if (!response.ok) {
      throw new Error(
        `${response.url}: ${response.status} ${response.statusText}`
      )
    }

    const buffer = await response.arrayBuffer()
    const feed = decodeFeedMessage(buffer)

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
