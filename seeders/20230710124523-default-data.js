'use strict'

const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { name, email, password } = SEED_USER
    return queryInterface.bulkInsert('Users', [{
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
      .then((userId) => {
        return queryInterface.bulkInsert('Todos',
          Array.from({ length: 10 }).map((_, i) => ({
            name: `name-${i}`,
            UserId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
          }))
        , {})
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {})
      .then(() => queryInterface.bulkDelete('Users', null, {}))
  }
}