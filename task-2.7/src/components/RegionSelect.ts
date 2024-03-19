export type SelectRegionCb = (region: string) => void;

export class RegionSelect {
	private toggle: HTMLButtonElement;
	private menuList: HTMLDivElement;
	private options: NodeListOf<HTMLDivElement>;

	private isOpen: boolean = false;

	constructor(private menu: HTMLDivElement, private select: SelectRegionCb) {
		this.toggle = this.menu.querySelector('.menu-toggle')!;
		this.menuList = this.menu.querySelector('.menu-list')!;
		this.options = this.menu.querySelectorAll('.menu-item')!;
	}

	public setupListeners(): void {
		this.toggle.addEventListener('click', this.toggleMenu);
		this.toggle.addEventListener('blur', this.toggleMenu);
		this.options.forEach((op) => op.addEventListener('mousedown', this.onSelect));
	}

	private toggleMenu = (): void => {
		this.isOpen = !this.isOpen;
		this.menuList.classList.toggle('hidden', !this.isOpen);
	};

	private onSelect = (event: any) => {
		event.stopPropagation();
		event.preventDefault();
		this.select(event.target.dataset.region);
		this.toggleMenu();
	};
}
