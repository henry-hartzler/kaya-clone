const express = require('express')
const Send = require('../models/send')

const sendRouter = express.Router()

sendRouter
	.route('/')
	.get((req, res, next) => {
		Send.find()
			.then((sends) => {
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(sends)
			})
			.catch((err) => next(err))
	})
	.post((req, res, next) => {
		Send.create(req.body)
			.then((sends) => {
				console.log('Send: ', sends)
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(sends)
			})
			.catch((err) => next(err))
	})

module.exports = sendRouter
