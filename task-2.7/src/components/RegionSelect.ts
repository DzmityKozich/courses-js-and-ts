export class RegionSelect {
	private toggle: HTMLButtonElement;
	private menuList: HTMLDivElement;
	private options: NodeListOf<HTMLDivElement>;

	private isOpen: boolean = false;

	constructor(private menu: HTMLDivElement) {
		this.toggle = this.menu.querySelector('.menu-toggle')!;
		this.menuList = this.menu.querySelector('.menu-list')!;
		this.options = this.menu.querySelectorAll('.menu-item')!;
	}

	public setupListeners(): void {
		this.toggle.addEventListener('click', this.toggleMenu);
		this.options.forEach((op) => op.addEventListener('click', this.onSelect));
	}

	private toggleMenu = (): void => {
		this.isOpen = !this.isOpen;
		const height = this.isOpen ? this.menuList.scrollHeight : 0;
		this.menuList.style.height = `${height}px`;
		this.menuList.classList.toggle('border-0', !this.isOpen);
	};

	private onSelect = (event: any) => {
		console.log(event.target.dataset.region);
	};
}
