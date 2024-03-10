import { TodoTask } from '../models/TodoTask';
import { StoreService } from '../services/StoreService';
import { TodoList } from './TodoList';
import { TodoWidgetHeader } from './TodoWidgetHeader';

export class TodoWidget {
	private widgetHeader: TodoWidgetHeader;
	private todoList: TodoList;

	private storeService = new StoreService();

	constructor(private widgetElement: HTMLDivElement) {
		const widgetHeader = this.widgetElement.querySelector<HTMLFormElement>('.todo-header')!;
		this.widgetHeader = new TodoWidgetHeader(widgetHeader, this.onTaskAdd);
		this.widgetHeader.setupListeners();
		const todoList = this.widgetElement.querySelector<HTMLDivElement>('.todo-list')!;
		this.todoList = new TodoList(todoList, this.onTaskRemove, this.onTaskUpdate);
		this.todoList.init(this.storeService.getTasks());
	}

	private onTaskAdd = (task: TodoTask) => {
		this.todoList.push(task);
		this.storeService.addTask(task);
	};

	private onTaskRemove = (task: TodoTask) => {
		this.storeService.removeTask(task);
	};

	private onTaskUpdate = (task: TodoTask) => {
		this.storeService.updateTask(task);
	};
}
