const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sendSchema = new Schema(
	{
		climbId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		grade: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
)

const Send = mongoose.model('Send', sendSchema)

module.exports = Send
