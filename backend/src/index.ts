import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import db from './db'

dotenv.config()

const app: Express = express()
const port = Number(process.env.PORT) || 8000
const fetchInterval = Number(process.env.DATA_FETCH_INTERVAL) || 10000

const fetchData = () => console.log('naak')

// Create interval to fetch data from API
setInterval(() => console.log('fetch data'), fetchInterval)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.get('/vehicleposition', (req: Request, res: Response) => {
  res.send(db.vehicleposition)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
