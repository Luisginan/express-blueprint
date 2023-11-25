class TodoManager {
    constructor(database) {
        this.database = database;
    }

    
    create(todo) {
        // TODO: Implement create function to add a new todo to the database
        if (!todo.title || !todo.description) {
            throw new Error('Title and description are required');
        }
        
        const query = `INSERT INTO Todo (title, description) VALUES (?, ?)`;
        const values = [todo.title, todo.description];
        return new Promise((resolve, reject) => {
            this.database.query(query, values, (error, result) => {
                if (error) {
                    console.error('Error creating todo:', error);
                    reject(error);
                } else {
                    console.log('Todo created successfully');
                    resolve(result);
                }
            });
        });
    }

    readAll() {
        // TODO: Implement readAll function to retrieve all Todo from the database and return them
        const query = `SELECT * FROM Todo`;
        return new Promise((resolve, reject) => {
        this.database.query(query, (error, result) => {
            if (error) {
                console.error('Error reading Todo:', error);
                reject(error);
            } else {
                console.log('Todo read successfully');
                console.log(result);
                resolve(result);
            }
        });
    });
    }
    read(id) {
        // TODO: Implement read function to retrieve a todo from the database by its id and return it
        const query = `SELECT * FROM Todo WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.database.query(query, [id], (error, result) => {
                if (error) {
                    console.error('Error reading todo:', error);
                    reject(error);
                } else {
                    console.log('Todo read successfully');
                    resolve(result);
                }
            });
        });
    }

    update(id, updatedTodo) {
        // TODO: Implement update function to update a todo in the database by its id
        const query = `UPDATE Todo SET title = ?, description = ? WHERE id = ?`;
        const values = [updatedTodo.title, updatedTodo.description, id];
        return new Promise((resolve, reject) => {
            this.database.query(query, values, (error, result) => {
                if (error) {
                    console.error('Error updating todo:', error);
                    reject(error);
                } else {
                    console.log('Todo updated successfully');
                    resolve(result);
                }
            });
        });
    }

    delete(id) {
        // TODO: Implement delete function to remove a todo from the database by its id
        const query = `DELETE FROM Todo WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.database.query(query, [id], (error, result) => {
                if (error) {
                    console.error('Error deleting todo:', error);
                    reject(error);
                } else {
                    console.log('Todo deleted successfully');
                    resolve(result);
                }
            });
        });
    }
}

module.exports = TodoManager;
