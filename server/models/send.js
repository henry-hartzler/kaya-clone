const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sendSchema = new Schema(
	{
		climbId: {
			type: String,
			required: true,
			unique: false,
		},
		name: {
			type: String,
			required: true,
			unique: false,
		},
		grade: {
			type: String,
			required: true,
			unique: false,
		},
		location: {
			type: String,
			required: true,
			unique: false,
		},
		rating: {
			type: Number,
			required: true,
			unique: false,
		},
		date: {
			type: String,
			required: true,
			unique: false,
		},
		comment: {
			type: String,
			required: false,
			unique: false,
		},
	},
	{
		timestamps: true,
	}
)

const Send = mongoose.model('Send', sendSchema)

module.exports = Send
