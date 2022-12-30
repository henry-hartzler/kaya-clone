const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema(
	{},
	{
		timestamps: true,
	}
)

const ToDo = mongoose.model('ToDo', toDoSchema)

module.exports = ToDo
