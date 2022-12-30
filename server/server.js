const express = require('express')
const { MongoClient } = require('mongodb')
let db

const app = express()

app.get('/', async (req, res) => {
	const allClimbs = await db.collection('climbs').find().toArray()
	console.log(allClimbs)
	res.send('Hello World!')
})

const start = async () => {
	const client = new MongoClient('mongodb://localhost:27017/kaya-clone')
	await client.connect()
	db = client.db()
	app.listen(8000)
}
start()
