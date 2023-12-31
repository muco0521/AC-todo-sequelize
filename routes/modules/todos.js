const router = require('express').Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch((e) => console.log(e))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then((todo) => res.render('edit', { todo: todo.toJSON() }))
    .catch((e) => console.log(e))
})

router.post('/', (req, res) => {
  const name = req.body.name
  const UserId = req.user.id
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch((e) => console.log(e))
})

router.put('/:id', (req, res) => {
  const { name, isDone } = req.body
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect('/'))
    .catch((e) => console.log(e))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.findOne({ where: { id, userId } })
    .then((todo) => todo.destroy())
    .then(() => res.redirect('/'))
    .catch((e) => console.log(e))
})

module.exports = router
 