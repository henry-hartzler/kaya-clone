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
		console.log('REQ BODY:', req.body)
		Send.create(req.body)
			.then((sends) => {
				console.log('Send: ', sends)
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(sends)
			})
			.catch((err) => next(err))
	})

sendRouter.route('/:climbId').delete((req, res, next) => {
	Send.findOneAndDelete({ _id: req.params.climbId })
		.then((send) => {
			console.log('SEND: ', send)
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.json(send._id.toString())
		})
		.catch((err) => next(err))
})

module.exports = sendRouter
