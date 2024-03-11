export type BtnName = 'ok' | 'pen' | 'remove';

export class TodoItemActions {
	private okBtn: HTMLButtonElement;
	private penBtn: HTMLButtonElement;
	private removeBtn: HTMLButtonElement;

	constructor(private actionsElement: HTMLDivElement, private btnClick: (btnName: BtnName, event: Event) => void) {
		this.actionsElement.innerHTML = this.getHtml();
		this.okBtn = this.actionsElement.querySelector<HTMLButtonElement>('.item-action-btn.ok')!;
		this.penBtn = this.actionsElement.querySelector<HTMLButtonElement>('.item-action-btn.pen')!;
		this.removeBtn = this.actionsElement.querySelector<HTMLButtonElement>('.item-action-btn.trash')!;
	}

	public setupListeners(): void {
		this.okBtn.addEventListener('click', (event) => this.btnClick('ok', event));
		this.penBtn.addEventListener('click', (event) => this.btnClick('pen', event));
		this.removeBtn.addEventListener('click', (event) => this.btnClick('remove', event));
	}

	public hideAllBtns(): void {
		this.okBtn.style.display = 'none';
		this.penBtn.style.display = 'none';
		this.removeBtn.style.display = 'none';
	}

	public showOkBtnIf(condition: boolean): void {
		const state = condition ? 'block' : 'none';
		this.okBtn.style.display = state;
	}

	public showPenBtnIf(condition: boolean): void {
		const state = condition ? 'block' : 'none';
		this.penBtn.style.display = state;
	}

	public showRemoveBtnIf(condition: boolean): void {
		const state = condition ? 'block' : 'none';
		this.removeBtn.style.display = state;
	}

	private getHtml(): string {
		return `
			<button style="display: none" class="item-action-btn ok"><img src="./icons/ok.svg" alt=""></button>
			<button style="display: none" class="item-action-btn pen"><img src="./icons/pen.svg" alt=""></button>
			<button style="display: none" class="item-action-btn trash"><img src="./icons/trash.svg" alt=""></button>
		`;
	}
}
