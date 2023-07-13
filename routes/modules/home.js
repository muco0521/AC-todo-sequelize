const router = require('express').Router()
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  const userId = req.user.id
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { userId }
  })
  .then((todos) => res.render('index', { todos }))
  .catch(error => console.error(error))
})

module.exports = router