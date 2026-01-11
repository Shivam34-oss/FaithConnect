import express from 'express'
import { getLeaders } from '../controllers/leader.controller.js'

const router = express.Router()

router.get('/', getLeaders)

export default router