export type SidebarState = 'open' | 'close';

type ToggleCb = (state: SidebarState) => void;

export class SidebarToggle {
	private onToggleCb!: ToggleCb;

	public toggle(state: SidebarState): void {
		this.onToggleCb(state);
	}

	public onToggle(cb: ToggleCb): void {
		this.onToggleCb = cb;
	}
}

export const sidebarToggle = new SidebarToggle();
