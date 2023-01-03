const express = require('express')
const Climb = require('../models/climb')

const climbRouter = express.Router()

climbRouter
	.route('/')
	.get((req, res, next) => {
		Climb.find()
			.then((climbs) => {
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(climbs)
			})
			.catch((err) => next(err))
	})
	.post((req, res, next) => {
		Climb.create(req.body)
			.then((climb) => {
				console.log('CLIMB: ', climb)
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(climb)
			})
			.catch((err) => next(err))
	})

module.exports = climbRouter
