// a dummy user db class

const email = "admin@admin.com"
const password = "admin"
const id = 1

user = {email, password, id}

class User {
}

// a very trivial find by id with only one user with user id of 1
User.findById = id => new Promise((resolve, reject) => {
  id === 1 ? resolve(user) : reject({error: 'User not found'})
})

module.exports = {User, user}