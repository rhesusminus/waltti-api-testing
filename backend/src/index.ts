import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = Number(process.env.PORT) || 8000

const fetchData = () => console.log('naak')

const fetchInterval = 10000 // ms

// Create interval to fetch data from API

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
