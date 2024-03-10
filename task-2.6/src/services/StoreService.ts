import { TodoTask } from '../models/TodoTask';

const TASK_LIST_KEY = 'TASK_LIST';

export class StoreService {
	constructor() {}

	public getTasks(): TodoTask[] {
		const list = localStorage.getItem(TASK_LIST_KEY);
		if (!list) return [];
		return JSON.parse(list);
	}

	public removeTask(task: TodoTask): TodoTask[] {
		const tasks = this.getTasks();
		const index = tasks.findIndex(({ timestamp }) => task.timestamp === timestamp);
		if (index === -1) return tasks;
		const updatedList = tasks.filter((_, i) => i !== index);
		this.setTasks(updatedList);
		return updatedList;
	}

	public addTask(task: TodoTask): TodoTask[] {
		const tasks = this.getTasks();
		const updatedList = [...tasks, task];
		this.setTasks(updatedList);
		return updatedList;
	}

	public updateTask(task: TodoTask): TodoTask[] {
		const tasks = this.getTasks();
		const index = tasks.findIndex(({ timestamp }) => task.timestamp === timestamp);
		if (index === -1) return tasks;
		tasks.splice(index, 1, task);
		this.setTasks(tasks);
		return tasks;
	}

	public setTasks(taskList: TodoTask[]): void {
		localStorage.setItem(TASK_LIST_KEY, JSON.stringify(taskList));
	}
}
