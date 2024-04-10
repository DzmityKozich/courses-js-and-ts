import { ToDo } from '../models/ToDo';
import { RepositoryDef } from './repository-def';
import fs from 'fs';

export class RepositoryJson implements RepositoryDef {
	public getAll(): Promise<ToDo[]> {
		try {
			const todoListAsString = fs.readFileSync('./db/db.json').toString();
			const todoList = (JSON.parse(todoListAsString) as ToDo[]).map(
				({ id, createdAt, isComplete, text, title }) => new ToDo(id, title, text, createdAt, isComplete)
			);
			return Promise.resolve(todoList);
		} catch (error) {
			console.log(error);
			return Promise.resolve([]);
		}
	}

	public async getById(id: string): Promise<ToDo | null> {
		const todoList = await this.getAll();
		return todoList.find((item) => id === item.id) || null;
	}

	public async create(todo: ToDo): Promise<ToDo> {
		const todoList = await this.getAll();
		const index = todoList.findIndex(({ id }) => id === todo.id);
		if (index !== -1) return todo;
		const newTodo = new ToDo(todo.id, todo.title, todo.text, Date.now(), todo.isComplete);
		todoList.push(newTodo);
		this.writeFile(todoList);
		return newTodo;
	}

	public async update(todo: ToDo): Promise<ToDo | null> {
		const todoList = await this.getAll();
		const index = todoList.findIndex(({ id }) => id === todo.id);
		if (index === -1) return null;
		const newTodo = new ToDo(todo.id, todo.title, todo.text, todo.createdAt, todo.isComplete);
		todoList.splice(index, 1, newTodo);
		this.writeFile(todoList);
		return newTodo;
	}

	public async delete(id: string): Promise<boolean> {
		const todoList = await this.getAll();
		const index = todoList.findIndex((todo) => id === todo.id);
		if (index === -1) return false;
		todoList.splice(index, 1);
		this.writeFile(todoList);
		return true;
	}

	private writeFile(todoList: ToDo[]): void {
		fs.writeFileSync('./db/db.json', JSON.stringify(todoList, null, '\t'));
	}
}
