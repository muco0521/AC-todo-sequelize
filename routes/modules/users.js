const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        console.log('This Email already exist.')
        return res.render('register', { ...req.body })
      }

      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => 
          User.create({
            name,
            email,
            password: hash
          })
        )
        .then(() => res.redirect('/'))
        .catch((e) => console.log(e))
    })
})

router.get('/logout', (req, res) => {
  res.send('logout')
})


module.exports = router