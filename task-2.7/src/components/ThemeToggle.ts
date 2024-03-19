export class ThemeToggle {
	private toggleMarker: HTMLDivElement;

	private isOn: boolean = false;

	constructor(private toggle: HTMLButtonElement) {
		this.toggleMarker = this.toggle.querySelector('.toggle-marker')!;
	}

	public setupListeners(): void {
		this.toggle.addEventListener('click', () => {
			this.isOn = !this.isOn;
			this.toggleMarker.classList.toggle('active', this.isOn);
		});
	}
}
