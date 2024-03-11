import { TodoTask } from '../models/TodoTask';

export class TodoWidgetHeader {
	private inputElement: HTMLInputElement;
	private addBtn: HTMLButtonElement;

	constructor(private headerElement: HTMLFormElement, private taskAdd: (task: TodoTask) => void) {
		this.inputElement = this.headerElement.querySelector<HTMLInputElement>('.task-input input')!;
		this.addBtn = this.headerElement.querySelector<HTMLButtonElement>('.add-task-btn')!;
	}

	public setupListeners(): void {
		this.headerElement.addEventListener('submit', (event) => event.preventDefault());
		this.addBtn.addEventListener('click', () => this.addTodoTask());
	}

	private addTodoTask(): void {
		const value = this.inputElement.value;
		if (value) {
			this.taskAdd(new TodoTask(value, false));
			this.inputElement.value = '';
		}
	}
}
