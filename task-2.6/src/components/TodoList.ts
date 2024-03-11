import { TodoTask } from '../models/TodoTask';
import { TaskModifyFn } from '../models/types';
import { TodoItem } from './TodoItem';

export class TodoList {
	private taskList: TodoItem[] = [];

	constructor(private listElement: HTMLDivElement, private taskRemove: TaskModifyFn, private taskUpdate: TaskModifyFn) {}

	public init(tasks: TodoTask[]): void {
		tasks.forEach((task) => this.push(task));
	}

	public push(task: TodoTask): void {
		const taskItem = new TodoItem(task, () => this.remove(task), this.taskUpdate);
		taskItem.addTo(this.listElement);
		this.taskList.push(taskItem);
	}

	public remove(task: TodoTask): void {
		const index = this.taskList.findIndex(({ id }) => task.timestamp === id);
		if (index > -1) {
			const taskItem = this.taskList[index];
			taskItem.destroy();
			this.taskList.splice(index, 1);
			this.taskRemove(task);
		}
	}
}
