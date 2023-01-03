const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema(
	{
		climbId: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			unique: false,
		},
	},
	{
		timestamps: true,
	}
)

const ToDo = mongoose.model('ToDo', toDoSchema)

module.exports = ToDo
