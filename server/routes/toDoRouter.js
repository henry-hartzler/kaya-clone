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
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(toDo)
			})
			.catch((err) => next(err))
	})
	.delete((req, res, next) => {
		ToDo.findByIdAndDelete('63b2721e28e2964124defa1c')
			.then((toDo) => {
				console.log('TODO: ', toDo._id.toString())
				console.log()
				res.statusCode = 200
				res.setHeader('Content-Type', 'application/json')
				res.json(toDo._id)
			})
			.catch((err) => next(err))
	})

toDoRouter.route('/:climbId').delete((req, res, next) => {
	ToDo.findByIdAndDelete(req.params._id)
		.then((toDo) => {
			console.log('TODO: ', toDo._id.toString())
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.json(toDo._id)
		})
		.catch((err) => next(err))
})

module.exports = toDoRouter
