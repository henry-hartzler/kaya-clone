const express = require('express')
const Location = require('../models/location')

const locationRouter = express.Router()

locationRouter
	.route('/')
	.get((req, res, next) => {
		Location.find()
			.then((locations) => {
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(locations)
			})
			.catch((err) => next(err))
	})
	.post((req, res, next) => {
		Location.create(req.body)
			.then((location) => {
				console.log('LOCATION: ', location)
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(location)
			})
			.catch((err) => next(err))
	})

module.exports = locationRouter
