import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import db from './db'
import { getVehiclePosition } from './api'

dotenv.config()

const app: Express = express()
const port = Number(process.env.PORT) || 8000
const fetchInterval = Number(process.env.DATA_FETCH_INTERVAL) || 10000

// Create interval to fetch data from Waltti API
// setInterval(() => console.log('fetch data'), fetchInterval)

getVehiclePosition('oulu')

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.get('/vehicleposition', (req: Request, res: Response) => {
  res.send(db.vehicleposition)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
