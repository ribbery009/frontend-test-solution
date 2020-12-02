const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const moment = require('moment')
const mongoose = require('mongoose')

module.exports = (host, port) => {

  const app = express()

  const router = new express.Router()
  console.log("Before: ",app)
  app.use('/', router)
  console.log(router);
  console.log("After:",app)
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({extended: true}))
  router.use(cors())

  mongoose.connect('mongodb://localhost:27017/todos',{useNewUrlParser: true, useUnifiedTopology: true})
  let db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', function (callback) {
    console.log('Connection Succeeded')
  })

  let Todo = require('./Model/Model')

  /**
   * Az osszes todo lekerdezese
   */
  router.get('/api/todos', function (req, res, next) {

    Todo.find({}).sort({datetime: 1}).exec(function (error, todos) {
      if (error) {
        console.error(error)
        res.status(400).send({error: error})
        return
      }

      res.status(200).send(todos)

    })
  })

  /**
   * Todo lekerdezese id alapjan
   */
  router.get('/api/todos/:todoId', function (req, res) {
    let todo = {}
    res.status(200).json(todo)
  })

  /**
   * Todo letrehozasa
   */
  router.post('/api/todos', function (req, res) {
    
    if (req.body.title === '') {
      let error = 'Todo title must not be empty.'
      console.error(error)
      res.status(400).send({error: error})
      return
    }

    let title = req.body.title
    let completed = req.body.completed
    let datetime = moment(req.body.datetime).format()

    let newTodo = new Todo({
      title: title,
      completed: completed,
      datetime: datetime
    })

    newTodo.save(function (error) {
      if (error) {
        console.error(error)
        res.status(400).send({error: error})
      }
      res.status(201).json(newTodo)
    })
  })

  /**
   * Todo modositasa
   */
  router.patch('/api/todos/:todoId', function (req, res) {

    Todo.findById(req.params.todoId, 'title completed datetime',
      function (error, todo) {
        if (error) {
          console.error(error)
          res.status(400).send({error: error})
          return;
        }

        todo.title = req.body.title
        todo.completed = req.body.completed
        todo.datetime = moment(req.body.datetime).format()

        todo.save(function (error) {
          if (error) {
            console.error(error)
            res.status(400).send({error: error})
            return;
          }
          res.status(200).json(todo)
        })
      })
  })

  /**
   * Todo torlese
   */
  router.delete('/api/todos/:todoId', function (req, res) {

    Todo.remove({
      _id: req.params.todoId
    }, function (err, todo) {
      if (err) {
        console.error(error)
        res.status(400).send(error)
        return;
      }

      res.status(202).json(todo)
    })
  })

  // History fallback api
  router.use(history())
  // Kliens kod bundle betoltese, ha van
  router.use('/', express.static(path.join(__dirname, '../../client/dist'))) // History fallback utan kell megadni

  return app.listen(port, host, () => {
    console.info(`IdomSoft test web server started on ${host}:${port}`)
  })
}
