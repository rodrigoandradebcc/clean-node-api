import { Express } from 'express'
import { bodyParser } from '../middlewares/index'

export default (app: Express): void => {
  app.use(bodyParser)
}