import React from 'react';

import { ToDo } from '../models/todo.model';
import './TodoList.css';

interface TodoListProps {
	items: ToDo[];
	onDeleteTodo: (id: string) => void;
}

const TodoList = ({ items, onDeleteTodo }: TodoListProps): JSX.Element => {
	return (
		<ul>
			{items.map(todo => (
				<li key={todo.id}>
					<span>{todo.text}</span>
					<button onClick={onDeleteTodo.bind(null, todo.id)}>
						DELETE
					</button>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
