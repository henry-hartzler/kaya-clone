const express = require('express')
const ToDo = require('../models/toDo')

const toDoRouter = express.Router()

toDoRouter
	.route('/')
	.get((req, res, next) => {
		ToDo.find()
			.then((toDos) => {
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(toDos)
			})
			.catch((err) => next(err))
	})
	.post((req, res, next) => {
		ToDo.create(req.body)
			.then((toDo) => {
				console.log('ToDo: ', toDo)
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(toDo)
			})
			.catch((err) => next(err))
	})

toDoRouter.route('/:climbId').delete((req, res, next) => {
	ToDo.deleteOne({ climbId: req.params.climbId })
		.then((response) => {
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.json(response)
		})
		.catch((err) => next(err))
})

module.exports = toDoRouter
