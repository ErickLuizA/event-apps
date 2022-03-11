const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(cors())
app.use(express.json())

const users = []

function checksExistsUserAccount (request, response, next) {
  const { username } = request.headers

  const user = users.find(value => value.username === username)

  if (!user) {
    return response.status(404).json({
      error: 'User not found'
    })
  }

  request.user = user

  next()
}

app.post('/users', (request, response) => {
  const { name, username } = request.body

  const errors = []

  if (!name?.trim()) {
    errors.push('Missing name parameter')
  }

  if (!username?.trim()) {
    errors.push('Missing username parameter')
  }

  if (errors.length) {
    return response.status(422).json({ errors })
  }

  const alreadyExists = users.some(value => value.username === username)

  if (alreadyExists) {
    return response.status(400).json({
      error: 'This username is already in use. Please choose another.'
    })
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user)

  return response.status(201).json(user)
})

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request

  return response.status(200).json(user.todos)
})

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body
  const { user } = request

  const errors = []

  if (!title?.trim()) {
    errors.push('Missing title parameter')
  }

  if (!deadline?.trim()) {
    errors.push('Missing deadline parameter')
  }

  if (errors.length) {
    return response.status(422).json({ errors })
  }

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo)

  return response.status(201).json(todo)
})

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body
  const { id } = request.params
  const { user } = request

  const errors = []

  if (!title?.trim()) {
    errors.push('Missing title parameter')
  }

  if (!deadline?.trim()) {
    errors.push('Missing deadline parameter')
  }

  if (errors.length) {
    return response.status(422).json({ errors })
  }

  const todoIndex = user.todos.findIndex(value => value.id === id)

  if (todoIndex === -1) {
    return response.status(404).json({ error: 'This todo does not exists' })
  }

  user.todos[todoIndex] = {
    ...user.todos[todoIndex],
    title,
    deadline: new Date(deadline)
  }

  return response.status(200).json(user.todos[todoIndex])
})

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { id } = request.params
  const { user } = request

  const todoIndex = user.todos.findIndex(value => value.id === id)

  if (todoIndex === -1) {
    return response.status(404).json({ error: 'This todo does not exists' })
  }

  user.todos[todoIndex] = {
    ...user.todos[todoIndex],
    done: true
  }

  return response.status(200).json(user.todos[todoIndex])
})

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params
  const { user } = request

  const todoIndex = user.todos.findIndex(value => value.id === id)

  if (todoIndex === -1) {
    return response.status(404).json({ error: 'This todo does not exists' })
  }

  user.todos.splice(todoIndex, 1)

  return response.status(204).send()
})

module.exports = app
