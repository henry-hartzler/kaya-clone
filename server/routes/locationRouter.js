const express = require('express')
const Location = require('../models/location')

const locationRouter = express.Router()

locationRouter.route('/').get((req, res, next) => {
	Location.find()
		.then((locations) => {
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.json(locations)
		})
		.catch((err) => next(err))
})

module.exports = locationRouter
