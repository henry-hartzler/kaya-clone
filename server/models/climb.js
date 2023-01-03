const mongoose = require('mongoose')
const Schema = mongoose.Schema

const climbSchema = new Schema(
	{
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
	},
	{
		timestamps: true,
	}
)

const Climb = mongoose.model('Climb', climbSchema)

module.exports = Climb
