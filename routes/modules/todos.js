const router = require('express').Router()
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch((e) => console.log(e))
})

module.exports = router