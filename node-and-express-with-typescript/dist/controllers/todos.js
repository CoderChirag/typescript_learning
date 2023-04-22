"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
let TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = {
        id: new Date().toISOString(),
        text: text,
    };
    TODOS.push(newTodo);
    res.status(201).json({
        message: 'Created the todo.',
        createdTodo: newTodo,
    });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS[todoIndex] = { id: TODOS[todoIndex].id, text: updatedText };
    res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    TODOS = TODOS.filter(todo => todo.id !== todoId);
    res.json({ message: 'Todo deleted!' });
};
exports.deleteTodo = deleteTodo;
