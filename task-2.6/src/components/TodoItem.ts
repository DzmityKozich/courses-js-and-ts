import { TodoTask } from '../models/TodoTask';
import { TaskModifyFn } from '../models/types';
import { BtnName, TodoItemActions } from './TodoItemActions';

export class TodoItem {
	private item: HTMLDivElement;
	private checkbox: HTMLInputElement;
	private textInput: HTMLDivElement;

	private actions: TodoItemActions;
	private isEdit: boolean = false;

	constructor(private task: TodoTask, private taskRemove: TaskModifyFn, private taskUpdate: TaskModifyFn) {
		this.item = this.createItemElement();
		this.item.innerHTML = this.getHtml();
		const actions = this.item.querySelector<HTMLDivElement>('.item-actions')!;
		this.actions = new TodoItemActions(actions, this.onActionBtnClisk);
		this.checkbox = this.item.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
		this.textInput = this.item.querySelector<HTMLDivElement>('.item-text')!;
	}

	public get id(): number {
		return this.task.timestamp;
	}

	public destroy(): void {
		this.item.remove();
	}

	public addTo(node: Node): void {
		node.appendChild(this.item);
		this.setupListeners();
		this.actions.setupListeners();
		this.setupView();
	}

	private setupListeners(): void {
		this.checkbox.addEventListener('change', (event: any) => this.toggleTaskState(event.target.checked));
		this.item.addEventListener('mouseenter', () => this.updateBtnsView());
		this.item.addEventListener('mouseleave', () => {
			this.actions.hideAllBtns();
		});
	}

	private setupView(): void {
		this.textInput.classList.toggle('line-through', this.task.isComplete);
		this.checkbox.checked = this.task.isComplete;
	}

	private createItemElement(): HTMLDivElement {
		const element = document.createElement('div');
		element.classList.add('todo-item');
		element.dataset.taskId = `${this.task.timestamp}`;
		return element;
	}

	private getHtml(): string {
		return `
			<div class="done-mark">
				<input type="checkbox">
			</div>
			<div class="item-text" >${this.task.text}</div>
			<div class="item-actions"></div>
		`;
	}

	private toggleTaskState(isComplete: boolean): void {
		this.textInput.classList.toggle('line-through', isComplete);
		this.task.isComplete = isComplete;
		this.updateBtnsView();
		this.taskUpdate(this.task);
	}

	private onActionBtnClisk = (btnName: BtnName) => {
		if (btnName === 'pen') {
			this.onPenBtnClisk();
		}
		if (btnName === 'ok') {
			this.onOkBtnClick();
		}
		this.updateBtnsView();
		if (btnName === 'remove') {
			this.onRemoveBtnClick();
		}
	};

	private onPenBtnClisk(): void {
		this.textInput.contentEditable = 'true';
		this.isEdit = true;
	}

	private onOkBtnClick(): void {
		this.textInput.contentEditable = 'false';
		this.isEdit = false;
		this.task.text = this.textInput.textContent || '';
		this.taskUpdate(this.task);
	}

	private onRemoveBtnClick(): void {
		this.taskRemove(this.task);
	}

	private updateBtnsView(): void {
		this.actions.showOkBtnIf(this.isEdit);
		this.actions.showPenBtnIf(!this.isEdit && !this.task.isComplete);
		this.actions.showRemoveBtnIf(!this.isEdit);
	}
}
