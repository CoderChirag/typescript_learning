import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

let TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
	const text = (req.body as { text: string }).text;
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

export const getTodos: RequestHandler = (req, res, next) => {
	res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
	const todoId = req.params.id;
	const updatedText = (req.body as { text: string }).text;
	const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
	if (todoIndex < 0) {
		throw new Error('Could not find todo!');
	}
	TODOS[todoIndex] = { id: TODOS[todoIndex].id, text: updatedText };
	res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
	const todoId = req.params.id;
	TODOS = TODOS.filter(todo => todo.id !== todoId);
	res.json({ message: 'Todo deleted!' });
};
