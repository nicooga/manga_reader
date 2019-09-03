import { readFileSync } from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const env = process.env.NODE_ENV || 'development';
const config = (
  '../db/config.json'
  |> path.resolve(__dirname, #)
  |> readFileSync(#)
  |> JSON.parse(#)
)[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

export { Sequelize, sequelize }
