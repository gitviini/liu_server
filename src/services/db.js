import dotenv from "dotenv"
import postgres from 'postgres'

dotenv.config()

console.log(`\n\x1b[3;30m${process.env.DATABASE_URL}\x1b[m\n`)

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

export default sql