const express = require('express')
const ToDo = require('../models/toDo')

const toDoRouter = express.Router()

toDoRouter.route('/').get((req, res, next) => {
	ToDo.find()
		.then((toDos) => {
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.json(toDos)
		})
		.catch((err) => next(err))
})

module.exports = toDoRouter
