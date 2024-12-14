export class ToasContainer {
	constructor(private container: HTMLDivElement) {}

	public addToast(message: string): void {
		const toast = new Toast(message);
		toast.addTo(this.container);
	}
}

export class Toast {
	private toast: HTMLDivElement;
	private timer: number;

	constructor(private message: string) {
		this.toast = this.createToast();
		this.timer = this.startTimer();
	}

	private createToast(): HTMLDivElement {
		const toast = document.createElement('div');
		toast.classList.add('toast', 'tost-appear-animation');
		toast.textContent = this.message;
		return toast;
	}

	private startTimer(): number {
		return setTimeout(() => {
			this.remove(true);
		}, 3000);
	}

	public addTo(parent: Node): void {
		parent.appendChild(this.toast);
		this.setupListeners();
	}

	private setupListeners(): void {
		this.toast.addEventListener('click', () => this.remove(true));
		this.toast.addEventListener('animationend', () => {
			this.toast.classList.remove('toast-disappear-animation', 'tost-appear-animation');
		});
	}

	public remove(animated: boolean): void {
		if (animated) {
			this.toast.addEventListener('animationend', () => {
				this.toast.remove();
			});
			this.toast.classList.add('toast-disappear-animation');
		} else {
			this.toast.remove();
		}
		clearTimeout(this.timer);
	}
}
