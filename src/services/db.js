import dotenv from "dotenv"
import postgres from 'postgres'

dotenv.config()

console.log(process.env.DATABASE_URL)

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

export default sql