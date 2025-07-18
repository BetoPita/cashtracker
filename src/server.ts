import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'
import authRouter from './routes/authRouter'

async function connectDB() {
  try {
    await db.authenticate()
    await db.sync();
    console.log(colors.green.bold('Conexión a la base de datos exitosa'))
  } catch (error) {
    console.log(colors.red.bold('Falló la conexión a la base de datos'))
    console.error(error)
  }
}

connectDB()

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/budgets', budgetRouter)
app.use('/api/auth', authRouter)

export default app
