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
		this.okBtn.classList.add('hidden');
		this.penBtn.classList.add('hidden');
		this.removeBtn.classList.add('hidden');
	}

	public showOkBtnIf(condition: boolean): void {
		this.okBtn.classList.toggle('hidden', !condition);
	}

	public showPenBtnIf(condition: boolean): void {
		this.penBtn.classList.toggle('hidden', !condition);
	}

	public showRemoveBtnIf(condition: boolean): void {
		this.removeBtn.classList.toggle('hidden', !condition);
	}

	private getHtml(): string {
		return `
			<button class="hidden item-action-btn ok"><img src="./icons/ok.svg" alt=""></button>
			<button class="hidden item-action-btn pen"><img src="./icons/pen.svg" alt=""></button>
			<button class="hidden item-action-btn trash"><img src="./icons/trash.svg" alt=""></button>
		`;
	}
}
