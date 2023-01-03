const express = require('express')
const logger = require('morgan')
const config = require('./config')
const path = require('path')
// const { MongoClient } = require('mongodb')
// let db

const climbRouter = require('./routes/climbRouter')
const locationRouter = require('./routes/locationRouter')
const toDoRouter = require('./routes/toDoRouter')
const sendRouter = require('./routes/sendRouter')

const mongoose = require('mongoose')
const url = config.mongoUrl
const connect = mongoose.connect(url)
connect.then(
	() => console.log('Connected correctly to server'),
	(err) => console.log(err)
)

const app = express()

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/climbs', climbRouter)
app.use('/locations', locationRouter)
app.use('/todos', toDoRouter)
app.use('/sends', sendRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

// app.get('/', async (req, res) => {
// 	const allClimbs = await db.collection('climbs').find().toArray()
// 	res.render('home', { allClimbs })
// })

// app.get('/api/climbs', async (req, res) => {
// 	const allClimbs = await db.collection('climbs').find().toArray()
// 	res.json(allClimbs)
// })

// const start = async () => {
// 	const client = new MongoClient('mongodb://localhost:27017/kaya-clone')
// 	await client.connect()
// 	db = client.db()
// 	app.listen(8000)
// }
// start()

module.exports = app
