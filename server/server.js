const express = require('express')
const { MongoClient } = require('mongodb')
let db

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', async (req, res) => {
	const allClimbs = await db.collection('climbs').find().toArray()
	res.render('home', { allClimbs })
})

app.get('/api/climbs', async (req, res) => {
	const allClimbs = await db.collection('climbs').find().toArray()
	res.json(allClimbs)
})

const start = async () => {
	const client = new MongoClient('mongodb://localhost:27017/kaya-clone')
	await client.connect()
	db = client.db()
	app.listen(8000)
}
start()
