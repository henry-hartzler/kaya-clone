const mongoose = require('mongoose')
const Schema = mongoose.Schema

const climbSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		grade: {
			type: String,
			required: true,
			unique: true,
		},
		location: {
			type: String,
			required: true,
			unique: true,
		},
		rating: {
			type: Number,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
)

const Climb = mongoose.model('Climb', climbSchema)

module.exports = Climb
