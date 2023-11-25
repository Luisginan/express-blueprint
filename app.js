const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db-connector');
const TodoManager = require('./managers/todo-manager');
const Todo = require('./models/todo');

const app = express();
const port = 3000;

// Parse incoming JSON requests
app.use(bodyParser.json());

const todoManager = new TodoManager(connection);

app.get('/todos', (req, res) => {
  todoManager.readAll()
  .then(result => {
    // Process the result
    console.log(result);
    res.json(result);
  })
  .catch(error => {
    // Handle the error
    console.error(error);
    res.status(500).json({ error });
  });
});

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
  console.log(req.body);
  const { Title, Description } = req.body;
  var newTodo = new Todo(Title, Description, new Date());
  todoManager.create(newTodo);
  res.json(newTodo);
});

// GET /todos/:id - Retrieve a todo by its id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  todoManager.read(id)
  .then(result => {
    // Process the result
    console.log(result);
    res.json(result);
  })
  .catch(error => {
    // Handle the error
    console.error(error);
    res.status(500).json({ error });
  });
});

// PUT /todos/:id - Update a todo by its id
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const { Title, Description } = req.body;
  const updatedTodo = new Todo(Title, Description, new Date());
  todoManager.update(id, updatedTodo)
  .then(result => {
    // Process the result
    console.log(result);
    res.json(result);
  })
  .catch(error => {
    // Handle the error
    console.error(error);
    res.status(500).json({ error });
  });
});

// DELETE /todos/:id - Delete a todo by its id
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  todoManager.delete(id)
  .then(result => {
    // Process the result
    console.log(result);
    res.json(result);
  })
  .catch(error => {
    // Handle the error
    console.error(error);
    res.status(500).json({ error });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
